import { get, pick } from 'lodash'

export type ConversionItem = {
  id: string
  label: string
  time: number
}

export type ConversionSchema = ConversionItem[]

export type CvsMsgItem = {
  cvsId: string
  id: string
  code: string
  data: any
  createdAt: number
  _role: string
  _omitAiContext?: boolean
  _omitChatHistory?: boolean
  [key: string]: any
}

export type CvsMsgListSchema = CvsMsgItem[]

// 过滤掉不需要的信息
export const filterMsg = (cvsId: string, rawMsgItem: any) => {
  const transItem = (item: any) => {
    const requiredItem = pick(item, [
      'id',
      'code',
      'data',
      'createdAt',
      '_role',
      '_omitAiContext',
      '_omitChatHistory',
    ])
    const newItem = {
      ...requiredItem,
      cvsId,
    }
    // 历史信息 将 Ai 消息进行转换为 md
    if (newItem.code === 'foundation-model') {
      newItem.code = 'markdown'
      newItem.data = {
        text: get(newItem, 'data.sentenceList.0.content') || '暂无数据',
      }
    }

    return newItem
  }

  if (Array.isArray(rawMsgItem)) {
    return rawMsgItem.map(transItem)
  }

  return transItem(rawMsgItem)
}

export const transMsgToAiMsg = (msgItem: CvsMsgItem) => {
  const transItem = (item: any) => {
    const { _role: role, data = {}, _omitAiContext } = item
    return {
      role,
      content: get(data, 'text') || '',
      _omitAiContext,
    }
  }

  if (Array.isArray(msgItem)) {
    return msgItem.flatMap((item) => {
      const newItem = transItem(item)
      if (!newItem.content) {
        return []
      }
      return [newItem]
    })
  }

  return transItem(msgItem)
}

const idMsgContentMapRef: any = {}
export const formatMsg = (data: Record<string, any>) => {
  idMsgContentMapRef[data.id] =
    (idMsgContentMapRef[data.id] || '') + (data.choices?.[0]?.delta?.content || '')

  return {
    code: 'foundation-model',
    id: data.id,
    data: {
      sentenceList: [
        {
          content: idMsgContentMapRef[data.id],
        },
      ],
      // 是否流式结束
      streamEnd: !!data.choices?.[0]?.finish_reason,
    },
  }
}

export const resolveChunk = (chunk: string) => {
  const parts = chunk.split('\n\n')

  // Filter out any empty strings and remove the 'data: ' prefix
  const jsonStrings = parts
    .filter((part) => part.trim() !== '')
    .map((part) => part.replace(/^data: /, ''))

  // Parse each JSON string into an object
  const result: any[] = []

  jsonStrings.forEach((str) => {
    if (str === '[DONE]') {
      return
    }
    try {
      result.push(JSON.parse(str))
    } catch (error) {
      console.error('Error parsing JSON:', error)
    }
  })

  return result
}
