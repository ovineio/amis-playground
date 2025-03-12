/**
 * 使用 bigModel ai 模型实验 amis bot
 */

import { uuidv4 } from 'amis-core'
import { set, get, update, del } from 'idb-keyval'
import { reverse } from 'lodash'

import { bigModeConfig, bigModelApi, bigModeApiKey } from './aiServerConfig'
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
export const appendCvsMsgItem = async (cvsId: string, msgItems: CvsMsgItem[]) => {
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
  onError?: (...args: any[]) => void
  onDone?: (...args: any[]) => void
  onChunk?: (...args: any[]) => void
}
export const sendMsgSync = async (options: AskOptions) => {
  const { csvId, withContext, messages, onChunk, onDone, onError } = options

  const { messages: baseMsgs = [], ...restConfig } = bigModeConfig

  let contextMsgs = []
  if (csvId && withContext) {
    contextMsgs = await getCvsMsgList(csvId)
    contextMsgs = transMsgToAiMsg(contextMsgs)
  }

  // 最新的消息 在最下面
  const allMsgs = baseMsgs.concat(contextMsgs).concat(messages)

  const response = await fetch(bigModelApi.ask, {
    method: 'post',
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
    const { done, value } = await reader.read()
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
