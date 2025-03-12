import { uuidv4 } from 'amis-core'
import { random } from 'lodash'

import {
  appendCvsMsgItem,
  defaultCvs,
  getCvsMsgList,
  sendMsgSync,
} from '@/localServer/aiServervice'

let chatBot: any = null

export const setChatBoot = (bot) => {
  chatBot = bot
}

export const getChatBoot = () => {
  return chatBot
}

const helloMsgPool = [
  'Hi~ 我是 Amis Bot，Amis 相关问题都可以问我哦。',
  '我Amis玩的很溜，不信？来试试吧～',
  'Amis 是不是有点难？不怕，有我在，我能帮助你～',
  'Amis 不止只是能通过 Json 配置哦，还有很多其他高级功能呢～',
  '嘿！我是 Amis 小助手，快来和我一起探索 Amis 的奇妙世界吧！',
  'Amis 的秘密我都知道，快来问我，别害羞哦～',
  '想成为 Amis 达人吗？让我来帮你实现这个小目标！',
  'Amis 的魔法等你来发现，我是你的魔法导师！',
  'Amis 让开发更简单，我让 Amis 更有趣！',
  'Amis 的世界无奇不有，快来和我一起探险吧！',
  ,
  'Amis 的小秘密我都知道，快来问我，别客气！',
  'Amis 的每个角落我都熟悉，快来和我一起探索吧！',
  'Amis 的奥秘等你来揭开，我是你的专属向导！',
  'Amis 的精彩由你来发现，我是你最好的伙伴！',
  '你好，我是 Amis 小精灵，Amis 的世界由我为你开启！',
  'Amis 的每个细节我都了如指掌，快来问我吧！',
  '想知道 Amis 的独门秘籍吗？我来为你揭秘！',
  'Amis 的奇妙之旅由我为你导航，准备好了吗？',
  'Amis 的奥秘无穷无尽，快来和我一起探索！',
  'Amis 的世界充满惊喜，我是你的惊喜制造机！',
  'Amis 的每个功能我都能解锁，快来挑战我吧！',
  'Amis 的精彩由我为你呈现，快来体验吧！',
  'Amis 的魔法等你来施展，我是你的魔法助手！',
  'Amis 的每个角落都有故事，我是你的故事讲述者！',
]

export const getDefaultMsgs = () => {
  const helloMsg = helloMsgPool[random(0, helloMsgPool.length - 1)]
  return [
    {
      code: 'text',
      _helloMsg: true,
      data: {
        text: helloMsg || helloMsgPool[0],
      },
    },
  ]
}

export const isInputDisabled = () => {
  return !!chatBot.bot.appOptions?.config?.inputOptions?.disabled
}

export const getHistoryMsgs = async () => {
  let msgList = await getCvsMsgList(defaultCvs.id)
  let historyMsgs = []
  if (msgList.length) {
    msgList = msgList.map((item) => {
      return {
        ...item,
        position: item._role === 'user' ? 'right' : 'left',
        // meta: {
        //   history: true,
        // },
      }
    })
    historyMsgs = msgList.concat([{ code: 'system', data: { text: '以上是历史消息' } }])
  }

  console.log('historyMsgs>', historyMsgs)
  return {
    list: historyMsgs,
    noMore: true,
  }
}

export const sendMsg = (msg: any) => {
  if (msg.type !== 'text') {
    return
  }
  let withTyping = true
  chatBot.bot.appendMessage({
    id: 'typing',
    code: 'typing',
  })
  chatBot.bot.setConfig({
    inputOptions: {
      disabled: true,
    },
  })
  sendMsgSync({
    csvId: defaultCvs.id,
    withContext: true,
    messages: [
      {
        role: 'user',
        content: msg.data.text,
      },
    ],
    onError: ({ msg, chunks }) => {
      chatBot.bot.deleteMessage('typing')
      chatBot.bot.appendMessage({
        code: 'markdown',
        id: uuidv4(),
        data: {
          text:
            '<span class="text-danger font-bold">抱歉，无法正常回复您的消息，原因：</span>' +
            (chunks ? '\n```json \n' + JSON.stringify(chunks, ' ', 2) + '\n```' : msg),
        },
      })
    },
    onChunk({ formattedMsg }) {
      if (withTyping) {
        withTyping = false
        chatBot.bot.deleteMessage('typing')
      }
      chatBot.bot.updateOrAppendMessage(formattedMsg)
    },
    onDone: ({ formattedMsg, msg: errMsg }) => {
      chatBot.bot.setConfig({
        inputOptions: {
          disabled: false,
        },
      })
      appendCvsMsgItem(
        defaultCvs.id,
        [
          {
            ...msg,
            _role: 'user',
            id: uuidv4(),
          },
          !errMsg && {
            ...formattedMsg,
            _role: 'assistant',
          },
        ].filter(Boolean)
      )
    },
  })
}
