/**
 * TODO:
 * 2. 支持多会话
 */

import { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'

import { initChatBot, getChatBoot } from './components/ChatWindow'
import { FloatAiIcon } from './components/FloatAiIcon'

const AppEntry = () => {
  const chatWindowRef = useRef(null)

  const [showWindow, setShowWindow] = useState(false)

  const handleToggleWindow = () => {
    setShowWindow(!showWindow)
  }

  useEffect(() => {
    setTimeout(() => {
      setShowWindow(true)
    }, 2000)
  }, [])

  useEffect(() => {
    if (showWindow && !getChatBoot()) {
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
