import {
  getDefaultMsgs,
  getHistoryMsgs,
  sendMsg,
  setChatBot,
  getChatBot,
  clearCurrConversion,
  abortCurrReplying,
  askToHumanPrompt,
  isChatSdkLoad,
  uploadFiles,
} from './chatContrl'
import { Header } from './Header'
import { MsgContentProxy } from './MsgContentProxy'
import defBot from '../../assets/def-bot.jpeg'
import defUser from '../../assets/def-user.png'

import styles from './index.module.less'

export { getChatBot, isChatSdkLoad }

export const initChatBot = (opts: { root: any }) => {
  // 未加载成功 SDK 不处理
  if (!isChatSdkLoad()) {
    return
  }

  const { root } = opts

  root.classList.add(styles.chatContainer)

  const chatBot = new ChatSDK({
    root,
    config: {
      autoLoadMore: true,
      robot: {
        avatar: defBot,
      },
      user: {
        avatar: defUser,
      },
      messages: getDefaultMsgs(),
      toolbar: [
        {
          // 支持配置成内置icon名称
          type: 'uploadFile',
          title: '上传文件',
          icon: 'folder',
        },
      ],
      quickReplies: [
        {
          name: '清空会话',
          icon: 'refresh',
          onClick: clearCurrConversion,
        },
        {
          name: '中断回复',
          icon: 'close',
          onClick: abortCurrReplying,
        },
        {
          name: '人工提问',
          icon: 'servicer',
          onClick: askToHumanPrompt,
        },
      ],
      renderNavbar() {
        return <Header />
      },
      // sidebar: [
      //   {
      //     code: 'ConversionPanel',
      //   },
      // ],
    },
    handlers: {
      // beforeSendMessage() {
      //   if (getChatBot().isReplying) {
      //     return false // false时消息将不放到消息列表中
      //   }
      // },
      // 对 消息内容进行处理
      renderMessageContent({ msg, _ctx, children }) {
        return <MsgContentProxy msg={msg}>{children}</MsgContentProxy>
      },
      onToolbarClick: function (item) {
        switch (item.type) {
          case 'uploadFile':
            uploadFiles()
            break
          default:
        }
      },
    },
    requests: {
      history: getHistoryMsgs,
      send: (userMsg: any) => {
        sendMsg({
          isserMsg: true,
          msg: userMsg,
        })
      },
    },
    components: {
      // ConversionPanel: () => {
      //   return <div>123</div>
      // },
    },
  })

  setChatBot(chatBot)
  window.chatBot = chatBot

  chatBot.run()
}
