/**
 * TODO:
 * 2. 支持多会话
 */

import { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'

import { initChatBot, getChatBot, isChatSdkLoad } from './components/ChatWindow'
import { FloatAiIcon } from './components/FloatAiIcon'

const AppEntry = () => {
  const chatWindowRef = useRef(null)

  const [showWindow, setShowWindow] = useState(false)

  const handleToggleWindow = () => {
    setShowWindow(!showWindow)
  }

  const handleDefOpenChat = () => {
    let timer: any = 0
    let reTryCount = 0
    const doDefOpenChat = () => {
      if (reTryCount > 3) {
        clearTimeout(timer)
        return
      }

      if (isChatSdkLoad() && !getChatBot()) {
        clearTimeout(timer)
        reTryCount = 0
        setShowWindow(true)
        return
      }

      reTryCount += 1
      clearTimeout(timer)
      timer = setTimeout(doDefOpenChat, 1500)
    }

    doDefOpenChat()

    return () => {
      clearTimeout(timer)
    }
  }

  useEffect(() => {
    // TODO: 梳理项目 postMsg 通信，封装公共方法
    window.addEventListener('message', ({ data }) => {
      const { action } = data
      if (action === 'closeChatWindow') {
        setShowWindow(false)
      }
    })

    const unMount = handleDefOpenChat()

    return () => {
      unMount()
    }
  }, [])

  useEffect(() => {
    if (showWindow && !getChatBot()) {
      initChatBot({
        root: chatWindowRef.current,
      })
    }
  }, [showWindow])

  return (
    <>
      <FloatAiIcon onClick={handleToggleWindow} showWindow={showWindow}>
        <div ref={chatWindowRef} />
      </FloatAiIcon>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('aiChatRoot')!).render(<AppEntry />)


