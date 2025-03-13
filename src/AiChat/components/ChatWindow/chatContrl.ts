import { toast } from 'amis'
import { uuidv4 } from 'amis-core'
import { random, set } from 'lodash'

import {
  appendCvsMsgItem,
  defaultCvs,
  getCvsMsgList,
  sendMsgSync,
  setCvsMsgList,
} from '@/localServer/aiServervice'

let chatBot: any = null

export const setChatBot = (bot) => {
  chatBot = bot
}

export const getChatBot = () => {
  return chatBot
}

export const isChatSdkLoad = () => {
  return !!ChatSDK
}

const setInputDisabled = (toggle: boolean) => {
  chatBot.bot.setConfig({
    inputOptions: {
      disabled: toggle,
    },
  })
}

const setIsReplying = (toggle: boolean) => {
  chatBot.isReplying = toggle
  setInputDisabled(toggle)
  const quickBtns = document.querySelectorAll('#aiChatRoot .ChatFooter .ScrollView-item')
  const clearBtn = quickBtns[0]?.querySelector('button')
  const abortBtn = quickBtns[1]?.querySelector('button')
  if (clearBtn && abortBtn) {
    clearBtn.disabled = toggle
    abortBtn.disabled = !toggle
  }
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

export const getHistoryMsgs = async () => {
  setIsReplying(false)
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
  chatBot.sendMsgAbortCtrl = new AbortController()
  setIsReplying(true)

  const handleChunk = ({ formattedMsg }) => {
    if (withTyping) {
      withTyping = false
      chatBot.bot.deleteMessage('typing')
    }
    chatBot.bot.updateOrAppendMessage(formattedMsg)
  }

  const handleError = ({ msg, chunks, errType, formattedMsg }) => {
    setIsReplying(false)
    if (errType === 'reqAbortErr') {
      // 如果存在id，则按正常流程
      if (formattedMsg?.id) {
        handleDone({ formattedMsg })
      }
      return
    }

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
  }

  const handleDone = ({ formattedMsg, msg: errMsg }) => {
    setIsReplying(false)

    // 数据流设置 结束状态
    set(formattedMsg, 'data.streamEnd', true)

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
  }

  sendMsgSync({
    csvId: defaultCvs.id,
    withContext: true,
    abortSignal: chatBot.sendMsgAbortCtrl.signal,
    messages: [
      {
        role: 'user',
        content: msg.data.text,
      },
    ],
    onError: handleError,
    onChunk: handleChunk,
    onDone: handleDone,
  })
}

export const clearCurrConversion = async () => {
  if (chatBot.isReplying) {
    toast.warning('正在回复中，无法清空会话')
    return
  }
  chatBot.bot.resetMessageList(
    [
      {
        code: 'system',
        data: {
          text: '已清空会话',
        },
      },
    ].concat(getDefaultMsgs())
  )
  await setCvsMsgList(defaultCvs.id, [])
  toast.success('已清空会话')
}

export const abortCurrReplying = () => {
  if (!chatBot.isReplying) {
    toast.warning('当前未在回复中，无法中断')
    return
  }

  if (chatBot.sendMsgAbortCtrl) {
    chatBot.sendMsgAbortCtrl.abort()
    chatBot.sendMsgAbortCtrl = null
    chatBot.bot.appendMessage({
      code: 'system',
      id: uuidv4(),
      data: {
        text: '已中断本次回复',
      },
    })
    toast.success('已中断本次回复')
    return
  }

  toast.error('无法中断')
}

export const reAskQuestion = () => {
  //
}

export const askToHumanPrompt = () => {
  chatBot.bot.appendMessage({
    code: 'recommend',
    data: {
      title:
        'Hello~ 目前 Amis Bot 还在完善中，希望能它够帮助你解决 Amis 的使用问题，以及辅助生成 Json。如果你有任何 Amis 使用上的问题，都可以向 AmisPlayground 提问～',
      recommends: [
        {
          title: '向 AmisPlayground 提问 （回复比 Amis官方 快～）',
          url: 'https://github.com/ovineio/amis-playground/issues?q=sort%3Aupdated-desc+is%3Aissue+is%3Aopen',
        },
        {
          title: '向 Amis官方 提问',
          url: 'https://github.com/baidu/amis/issues?q=sort%3Aupdated-desc+is%3Aissue+is%3Aopen',
        },
        {
          title: 'AmisPlayground 项目在做什么？',
          onClick: () => {
            chatBot.bot.appendMessage({
              type: 'markdown',
              // Doing 时再公布。
              // - [ ] 开发以Amis为基础库的一体化脚手架，提供快速上手开发功能。 (类似[UmiMax](https://umijs.org/docs/max/introduce))
              // - [ ] 集成[AmisEditor](https://github.com/aisuda/amis-editor-demo)与OpenSourceServer实现在线生成简易应用。（类似简版[爱速搭](https://aisuda.cloud.baidu.com/)）
              data: {
                text: `
如今 Amis 的使用者越来越多。AmisPlayground 正在围绕 Amis 打造一个方便好用的工具&平台，
帮助开发者更好的使用 Amis， 将 Amis 提供的能力发挥到最大~

**主要开发内容是：**
- [x] 在线AmisDemo编辑器，提供代码片段分享功能。
- [ ] 借助已有AI模型提供辅助生成Json功能。
> 如果对本项目感兴趣，可以关注 [迭代计划](https://github.com/ovineio/amis-playground/issues/3)，同时欢迎参与进来~
`,
              },
            })
          },
        },
      ],
    },
  })
}
