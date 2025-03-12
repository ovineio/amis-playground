import { toast } from 'amis-ui'

import {
  getDefaultMsgs,
  getHistoryMsgs,
  isInputDisabled,
  sendMsg,
  setChatBoot,
  getChatBoot,
} from './chatContrl'
import { Header } from './Header'
import defBot from '../../assets/def-bot.jpeg'
import defUser from '../../assets/def-user.png'

import styles from './index.module.less'

import { defaultCvs, setCvsMsgList } from '@/localServer/aiServervice'

export { getChatBoot }

export const initChatBot = (opts: { root: any }) => {
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
      quickReplies: [
        {
          name: '清空会话',
          icon: 'refresh',
          onClick: async () => {
            if (isInputDisabled()) {
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
          },
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
      beforeSendMessage() {
        if (isInputDisabled()) {
          return false // false时消息将不放到消息列表中
        }
      },
      // 对 消息内容进行处理
      // renderMessageContent() {
      //   //
      // }
    },
    requests: {
      history: getHistoryMsgs,
      send: sendMsg,
    },
    components: {
      // ConversionPanel: () => {
      //   return <div>123</div>
      // },
    },
  })

  setChatBoot(chatBot)
  window.chatBot = chatBot

  chatBot.run()
}
