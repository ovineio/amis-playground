import { toast } from 'amis'
import { uuidv4 } from 'amis-core'
import { get, last, random, set } from 'lodash'

import { formatChunk } from './utils'

import { getGlobalAmisScope } from '@/Amis'
import {
  AiRole,
  appendCvsMsgItem,
  clearPromptFileCache,
  defaultCvs,
  extractFilesTexts,
  getCvsMsgList,
  sendMsgSync,
  setCvsMsgList,
  updateSystemPrompt,
} from '@/localServer/aiServervice'
import { formatFileSize } from '@/Playground/utils'

let chatBot: any = null

export const chatMsgId = {
  chatTyping: 'chatTyping',
  askHumanRecommend: 'askHumanRecommend',
  askToHumanAmisPlayground: 'askToHumanAmisPlayground',
  uploadFileMsgReply: () => `uploadFileReply_${uuidv4()}`,
  uploadFileMsg: () => `uploadFile_${uuidv4()}`,
}

export const setChatBot = (bot) => {
  chatBot = bot
}

export const getChatBot = () => {
  return chatBot
}

export const isChatSdkLoad = () => {
  return !!ChatSDK
}

const toggleTypingMsg = (toggle: boolean) => {
  if (toggle) {
    appendChatMsg({
      id: chatMsgId.chatTyping,
      code: 'typing',
    })
    return
  }
  chatBot.bot.deleteMessage(chatMsgId.chatTyping)
}

const setInputDisabled = (toggle: boolean) => {
  chatBot.bot.setConfig({
    inputOptions: {
      disabled: toggle,
    },
  })
}

const setIsReplying = (toggle: boolean, lazySynBtn: boolean = false) => {
  chatBot.isReplying = toggle
  setInputDisabled(toggle)
  const quickBtns = document.querySelectorAll('#aiChatRoot .ChatFooter .ScrollView-item')
  const clearBtn = quickBtns[0]?.querySelector('button')
  const abortBtn = quickBtns[1]?.querySelector('button')
  if (!clearBtn || !abortBtn) {
    return
  }

  const syncBtn = () => {
    const csvIsEmpty = chatBot.bot.getMessageList()?.filter((i) => i.code !== 'system').length <= 1
    clearBtn.disabled = toggle || csvIsEmpty
    abortBtn.disabled = !toggle
  }
  if (lazySynBtn) {
    setTimeout(syncBtn, 1000)
  } else {
    syncBtn()
  }
}

const appendChatMsg = (msg) => {
  chatBot.bot.appendMessage(msg)
  if (msg.id !== chatMsgId.chatTyping) {
    setIsReplying(false)
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
  const msgList = await getCvsMsgList(defaultCvs.id)
  let historyMsgs = []

  let displayMsgList = msgList.filter((item) => !item._omitChatHistory)
  if (displayMsgList.length) {
    displayMsgList = displayMsgList.map((item) => {
      return {
        ...item,
        position: item._role === AiRole.user ? 'right' : 'left',
        // meta: {
        //   history: true,
        // },
      }
    })
    historyMsgs = displayMsgList.concat([{ code: 'system', data: { text: '以上是历史消息' } }])
  }
  console.log('historyMsgs>', historyMsgs)

  // 重置状态 按钮，（暂时没有找到合适的实际执行，先这么写）
  setIsReplying(false, true)

  return {
    list: historyMsgs,
    noMore: true,
  }
}

// 发送信息
type SendMsgOptions = {
  isUserMsg?: boolean
  isSystemMsg?: boolean
  msg: any
  onSendMsgSync?: () => void
}
export const sendMsg = (options: SendMsgOptions) => {
  const { msg, isUserMsg, onSendMsgSync } = options

  if (isUserMsg && msg.type !== 'text') {
    toast.warning('不支持发送该类型的')
    return
  }

  if (!msg.data?.text) {
    toast.warning('消息文本不能为空')
    return
  }

  const chatMsg = {
    ...msg,
    _role: msg.role || AiRole.user,
    id: uuidv4(),
  }
  const aiMsg = {
    role: msg.role || AiRole.user,
    content: msg.data?.text,
  }

  let withTyping = true
  toggleTypingMsg(true)
  setIsReplying(true)
  chatBot.sendMsgAbortCtrl = new AbortController()

  const handleChunk = ({ formattedMsg }) => {
    if (withTyping) {
      withTyping = false
      toggleTypingMsg(false)
    }
    chatBot.bot.updateOrAppendMessage(formattedMsg)
  }

  const handleError = ({ msg: errMsg, chunks, errType, formattedMsg }) => {
    setIsReplying(false)
    if (errType === 'reqAbortErr') {
      // 如果存在id，则按正常流程
      if (formattedMsg?.id) {
        handleDone({ formattedMsg })
      }
      return
    }

    toggleTypingMsg(false)
    appendChatMsg({
      code: 'markdown',
      id: uuidv4(),
      data: {
        text:
          '<span class="text-danger font-bold">抱歉，无法正常回复您的消息，原因：</span>' +
          (chunks ? '\n```json \n' + JSON.stringify(chunks, ' ', 2) + '\n```' : errMsg),
      },
    })
  }

  const handleDone = ({ formattedMsg, msg: errMsg }) => {
    setIsReplying(false)

    // 数据流设置 结束状态
    set(formattedMsg, 'data.streamEnd', true)

    // 存储到本地
    appendCvsMsgItem(
      defaultCvs.id,
      [
        chatMsg,
        !errMsg && {
          ...formattedMsg,
          _role: AiRole.assistant,
        },
      ].filter(Boolean)
    )
  }

  sendMsgSync({
    csvId: defaultCvs.id,
    withContext: true,
    abortSignal: chatBot.sendMsgAbortCtrl.signal,
    messages: [aiMsg], // 发送给 AI
    formatChunk,
    onError: handleError,
    onChunk: handleChunk,
    onDone: handleDone,
  })

  onSendMsgSync?.()
}

// 清空当前对话
export const clearCurrConversion = async () => {
  if (chatBot.isReplying) {
    toast.warning('正在回复中，无法清空会话')
    return
  }
  clearPromptFileCache()
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
  setIsReplying(false)
  toast.success('已清空会话')
}

// 中断回复
export const abortCurrReplying = () => {
  if (!chatBot.isReplying) {
    toast.warning('当前未在回复中，无法中断')
    return
  }

  if (chatBot.sendMsgAbortCtrl) {
    chatBot.sendMsgAbortCtrl.abort()
    chatBot.sendMsgAbortCtrl = null
    appendChatMsg({
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

// 重新生成问题
export const reReplyQuestion = () => {
  //
}

// 判断最后一条消息是否相同， 防止出现多次重复消息展位
const checkLastMsgIsSame = (msgId: string) => {
  const lastMsgId = get(last(chatBot.bot.getMessageList()), 'id')
  // 最后一条是重复消息
  if (lastMsgId === msgId) {
    return true
  }
  // 防止出现多次重复消息展位
  chatBot.bot.deleteMessage(msgId)
  return false
}

// 人工提问
export const askToHumanPrompt = () => {
  if (checkLastMsgIsSame(chatMsgId.askHumanRecommend)) {
    return
  }

  appendChatMsg({
    code: 'recommend',
    id: chatMsgId.askHumanRecommend,
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
            if (checkLastMsgIsSame(chatMsgId.askToHumanAmisPlayground)) {
              return
            }
            appendChatMsg({
              type: 'markdown',
              id: chatMsgId.askToHumanAmisPlayground,
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

export const uploadFiles = () => {
  const amisScope = getGlobalAmisScope()
  let cacheExtractResult: any[] = []
  amisScope.doAction([
    {
      actionType: 'dialog',
      dialog: {
        title: '上传文件',
        body: {
          type: 'form',
          // debug: true,
          id: 'aiChatUploadForm',
          api: '/amis/api/mock2/form/saveForm',
          body: [
            {
              type: 'alert',
              level: 'info',
              className: 'mb-2',
              body: `
              上传文件后提取文件的内容，并基于文件内容进行问答。<br/>
              文件限制：单次最多同时5个文件，单个最大5M。（可多次上传）<br/>
              <b>注意：</b> 文件不会被在保存云端，解析完毕后会在云端立即删除。因此上传文件仅在本次会话中生效。<br/>
              `,
            },
            {
              type: 'input-file',
              name: 'fileList',
              label: false,
              accept:
                '.pdf,.docx,.doc,.xls,.xlsx,.ppt,.pptx,.png,.jpg,.jpge,.csv,.txt,.html,.js,.ts,.jsx,.tsx,.xml,.yaml,.yml,.json',
              maxSize: 5 * 1024 * 1024,
              multiple: true,
              maxLength: 5,
              drag: true,
              asBlob: true,
            },
          ],
        },
        actions: [
          {
            type: 'action',
            label: '取消',
            actionType: 'close',
          },
          {
            type: 'action',
            label: '解析',
            level: 'primary',
            actionType: 'ajax',
            disabledOn: '${!fileList.length}',
            close: true,
            api: {
              url: '/extract',
              data: {
                fileList: '${fileList}',
              },
              dataProvider: async (req) => {
                const { fileList } = req.body

                let mergedFilesList = []
                mergedFilesList = fileList.map((file) => {
                  const cacheRes = cacheExtractResult.find((i) => {
                    const sameFile = i.file.id === file.id
                    const canUseCache = sameFile && !i.err && i.fileName && i.fileContent
                    return canUseCache
                  })
                  return cacheRes || { file }
                })

                cacheExtractResult = await extractFilesTexts(mergedFilesList)

                const errFiles = cacheExtractResult.filter((item) => !!item.err)
                // 文件发生错误
                if (errFiles.length) {
                  amisScope.doAction([
                    {
                      actionType: 'dialog',
                      dialog: {
                        title: '提示',
                        body: [
                          {
                            type: 'alert',
                            level: 'danger',
                            className: 'mb-2',
                            body: '下列文件在解析时出错，请调整后再试',
                          },
                          {
                            type: 'each',
                            value: errFiles.map((item) => {
                              const { file, err } = item
                              return {
                                text: `
                              <div class="bg-gray-100 p-2 r">
                                <span class="font-bold">出错文件：${file.path}</span>
                                <pre>${JSON.stringify(err, ' ', 2)}</pre>
                              </div>
                              `,
                              }
                            }),
                            items: [
                              {
                                type: 'tpl',
                                tpl: '${text|raw}',
                              },
                              {
                                type: 'divider',
                              },
                            ],
                          },
                        ],
                        actions: [
                          {
                            type: 'action',
                            label: '我知道了',
                            level: 'primary',
                            actionType: 'close',
                          },
                        ],
                      },
                    },
                  ])
                  return {
                    data: {
                      status: -1,
                      msg: '解析文件出错，请调整',
                    },
                  }
                }

                // start: 上传文件提示 MSG
                const uploadFileMsg = {
                  code: 'markdown',
                  id: chatMsgId.uploadFileMsg(),
                  position: 'right',
                  _omitAiContext: true,
                  _role: AiRole.user,
                  data: {
                    text: ` <span class="mr-2">📄</span>**文件已处理**

|文件名称|文件大小|是否解析
|------|-----|-----|
${cacheExtractResult
  .map((item) => {
    const { name, size } = item.file
    return `|${name}|${formatFileSize(size)}|✅|\n`
  })
  .join('')}

> 后续回复均会参考上述文件。如果出现回答无关联时，<br/>可给予提示：“根据 XX文件，做YYY”。
                    `,
                  },
                }
                appendChatMsg(uploadFileMsg)
                // end

                // 模拟机器人回复
                const botReplyMsg = {
                  code: 'text',
                  id: chatMsgId.uploadFileMsgReply(),
                  _omitAiContext: true,
                  _role: AiRole.assistant,
                  data: {
                    text: '👌我已收到你的文件啦，什么问题都可以问哦～😎',
                  },
                }
                appendChatMsg(botReplyMsg)

                // 更新提示词
                updateSystemPrompt({
                  type: 'updateFile',
                  fileArr: cacheExtractResult,
                })

                // 存储消息
                await appendCvsMsgItem(defaultCvs.id, [uploadFileMsg, botReplyMsg])

                return {
                  data: {},
                }
              },
            },
          },
        ],
      },
    },
  ])
}
