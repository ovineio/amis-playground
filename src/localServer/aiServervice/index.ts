/**
 * 使用 bigModel ai 模型实验 amis bot
 */

import { uuidv4 } from 'amis-core'
import axios from 'axios'
import { set, get, update, del } from 'idb-keyval'
import { isEmpty, last, omit } from 'lodash'

import {
  bigModeConfig,
  bigModelApi,
  bigModeApiKey,
  getSystemPromptMsg,
  updateSystemPrompt,
  AiRole,
  clearPromptFileCache,
} from './aiServerConfig'
import {
  ConversionItem,
  ConversionSchema,
  CvsMsgListSchema,
  filterMsg,
  resolveChunk,
  formatMsg,
  CvsMsgItem,
  transMsgToAiMsg,
} from './utils'

import { hash2json, json2hash } from '@/Playground/utils'

export { updateSystemPrompt, AiRole, clearPromptFileCache }

const dbKey = {
  aiConversion: 'app_ai_conversion',
  aiCvsMsgList: (cvsId: string) => `app_aiCvs_${cvsId}_msgList`,
}

export const defaultCvs = {
  id: 'defaultCvs',
  title: '默认新建会话',
  time: Date.now(),
}

// 获取会话
export const getConversions = async () => {
  const cvsList = await get(dbKey.aiConversion)

  if (!cvsList?.length) {
    return [defaultCvs]
  }

  return []
}

// 获取会话
export const getConversion = async (id?: string) => {
  const cvsList = await getConversions()
  const csv = cvsList.find((item) => item.id === id)
  return csv
}

/**
 * 创建会话
 */
export const addConversion = async (cvs: Partial<ConversionItem>) => {
  await update(dbKey.aiConversion, (saveList?: ConversionSchema) => {
    let cvsList = saveList || []
    const newCvs = {
      label: cvs.label || '新建会话',
      time: Date.now(),
      id: cvs.id || uuidv4(),
    }

    cvsList = [newCvs].concat(cvsList)

    return cvsList
  })
}

// 删除会话
export const delConversion = async (id: string) => {
  await update(dbKey.aiConversion, (saveList?: ConversionSchema) => {
    let cvsList = saveList || []
    cvsList = cvsList.filter((item) => item.id !== id)
    return cvsList
  })
  await del(dbKey.aiCvsMsgList(id))
}

// 获取会话消息列表
export const getCvsMsgList = async (cvsId: string) => {
  const compressed = await get(dbKey.aiCvsMsgList(cvsId))
  if (!compressed) {
    return []
  }
  const msgList = hash2json(compressed)

  return msgList
}

/**
 * 覆盖设置消息列表
 */
export const setCvsMsgList = async (cvsId: string, msgList: CvsMsgListSchema) => {
  if (!msgList.length) {
    await del(dbKey.aiCvsMsgList(cvsId))
    return
  }

  const newMsgList = filterMsg(cvsId, msgList)
  const compressed = json2hash(newMsgList)
  await set(dbKey.aiCvsMsgList(cvsId), compressed)
}

// 添加消息
export const appendCvsMsgItem = async (cvsId: string, msgItems: CvsMsgItem | CvsMsgItem[]) => {
  await update(dbKey.aiCvsMsgList(cvsId), (compressed?: string) => {
    let msgList = compressed ? hash2json(compressed) : []

    const newItems = Array.isArray(msgItems) ? msgItems : [msgItems]
    msgList = msgList.concat(filterMsg(cvsId, newItems))

    const newCompressed = json2hash(msgList)
    return newCompressed
  })
}

// 同步发送消息
type AskOptions = {
  messages: any[]
  csvId?: string
  withContext?: boolean
  abortSignal?: any
  onError?: (...args: any[]) => void
  onDone?: (...args: any[]) => void
  onChunk?: (...args: any[]) => void
}
export const sendMsgSync = async (options: AskOptions) => {
  const { csvId, withContext, messages, abortSignal, onChunk, onDone, onError } = options

  const { ...restConfig } = bigModeConfig

  let contextMsgs = []
  if (csvId && withContext) {
    contextMsgs = await getCvsMsgList(csvId)
    contextMsgs = transMsgToAiMsg(contextMsgs)
  }

  // 最新的消息 在最下面
  const allMsgs = [getSystemPromptMsg()]
    .concat(contextMsgs)
    .concat(messages)
    .flatMap((msg) => {
      const { _omitAiContext, ...aiMsg } = msg
      return _omitAiContext ? [] : aiMsg
    })

  const response = await fetch(bigModelApi.ask, {
    method: 'post',
    signal: abortSignal,
    body: JSON.stringify({
      ...restConfig,
      messages: allMsgs,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: bigModeApiKey,
    },
  })

  if (!response.body) {
    console.log('response.body is null ')
    onError &&
      onError({
        msg: '无数据返回',
      })
    return
  }

  const decoder = new TextDecoder('utf-8')
  const reader = response.body.getReader()
  let formattedMsg = {}
  // Todo: 防止死循环
  while (true) {
    let done, value
    try {
      const info = await reader.read()
      done = info.done
      value = info.value
    } catch (err: any) {
      const isAbort = err.name === 'AbortError'
      onError &&
        onError({
          msg: isAbort ? '主动中断请求' : '读取数据发生错误',
          errType: isAbort ? 'reqAbortErr' : 'readDataErr',
          err,
          formattedMsg,
        })
      break
    }

    if (done) {
      onDone &&
        onDone({
          msg: !formattedMsg.id ? '无消息ID' : '',
          formattedMsg,
        })
      break
    }

    const chunk = decoder.decode(value, { stream: false })
    const chunkItems = resolveChunk(chunk)

    chunkItems.forEach((item) => {
      if (item.id) {
        formattedMsg = formatMsg(item)
      }
    })

    if (!formattedMsg.id) {
      onError &&
        onError({
          msg: '无消息ID',
          chunks: chunkItems,
          formattedMsg,
        })
      break
    } else {
      onChunk &&
        onChunk({
          formattedMsg,
        })
    }
  }
}

// 暴力删除文件
const forceDeleteFile = async (id?: string) => {
  if (!id) {
    return
  }
  try {
    const result = await axios.delete(bigModelApi.deleteFile(id), {
      headers: {
        Authorization: bigModeApiKey,
      },
    })
    return result.data
  } catch (err) {
    //
  }
}

// 本地解析文本文件
const extractFileAtLocal = (file: File) => {
  return new Promise((resolve, reject) => {
    // 定义支持的文本类型
    const validFileTypes = '.csv,.txt,.html,.js,.ts,.jsx,.tsx,.xml,.yaml,.yml,.json'.split(',')
    const fileSuffix = `.${last(file.name.split('.'))}`

    if (!validFileTypes.includes(fileSuffix)) {
      resolve({
        fileTypeNotAllow: true,
      })
      return
    }

    const reader = new FileReader()

    // 定义文件读取完成后的回调函数
    reader.onload = function (e) {
      resolve({
        fileContent: e.target?.result || '',
      }) // 解析成功，返回文件内容
    }

    // 定义文件读取错误的回调函数
    reader.onerror = function () {
      reject({
        msg: '读取文件信息错误',
      })
    }

    // 读取文件为文本
    reader.readAsText(file)
  })
}

type ExtractInfo = {
  file: any
  fileId: string
  fileName: string
  fileContent: string
  isDeleted: boolean
  err: any
}
const extractSingleFile = async (options: Partial<ExtractInfo>): Promise<ExtractInfo> => {
  const { file } = options

  if (!file) {
    throw new Error('文件不存在')
  }

  // 如果既存ID又存在内容，直接返回
  if (options.fileId && options.fileContent) {
    // 防止没有删除干净
    if (!options.isDeleted) {
      await forceDeleteFile(options.fileId)
    }
    return omit(options, ['err']) as ExtractInfo
  }

  let result = {
    file,
    fileId: '',
    fileName: '',
    fileContent: '',
    isDeleted: false,
    err: null,
  }

  try {
    const { fileTypeNotAllow, fileContent } = await extractFileAtLocal(file)

    if (!fileTypeNotAllow) {
      result = {
        file,
        fileId: file.id,
        fileName: file.name,
        fileContent,
        isDeleted: true,
        err: null,
      }
      return result
    }

    // 如果存在 ID 先进行删除 （保持云端与本地一致）
    if (!options.isDeleted) {
      await forceDeleteFile(options.fileId)
    }

    // 上传文件
    const formData = new FormData()
    formData.append('file', file)
    formData.append('purpose', 'file-extract')
    const uploadRes = await axios
      .post(bigModelApi.uploadFile, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: bigModeApiKey,
        },
      })
      .catch((err) => {
        const errData = err.response?.data
        throw isEmpty(errData)
          ? {
              msg: '上传文件出错',
            }
          : errData
      })
    const { id, filename } = uploadRes.data
    result.fileId = id
    result.fileName = filename

    // 解析文件
    const extractRes = await axios
      .get(bigModelApi.extractFile(id), {
        headers: {
          Authorization: bigModeApiKey,
        },
      })
      .catch((err) => {
        const errData = err.response?.data
        throw isEmpty(errData)
          ? {
              msg: '解析文件出错',
            }
          : errData
      })
    const { content } = extractRes.data
    result.fileContent = content

    // 删除文件
    const deleteRes = await forceDeleteFile(id)
    result.isDeleted = deleteRes?.deleted || false
  } catch (err) {
    if (result.fileId) {
      await forceDeleteFile(result.fileId)
    }

    result.err = err
    console.log('解析文件发生错误：', err)
  }

  return result
}

export const extractFilesTexts = async (
  fileList: Partial<ExtractInfo>[]
): Promise<ExtractInfo[]> => {
  return Promise.all(fileList.map(extractSingleFile))
}
