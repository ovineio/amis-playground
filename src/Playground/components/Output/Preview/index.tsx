import React, { useEffect, useRef, useState } from 'react'

import iframeRaw from './iframe.html?raw'
import { getIframeUrl } from './utils'

import { Message } from '@/Playground/components/Message'
import type { IPreview, IMessageData } from '@/Playground/types'

const iframeUrl = getIframeUrl(iframeRaw)

export const Preview: React.FC<IPreview> = (props) => {
  const {
    hidden, // 是否隐藏
    data, // 代码数据
    iframeKey, // key
  } = props

  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    // 代码数据有什么变化同步到 iframe 中
    if (data) iframeRef.current?.contentWindow?.postMessage(data)
  }, [data])

  const handleMessage = (msg: IMessageData) => {
    const { type, message } = msg.data
    if (type === 'LOADED') {
      // load 时， 当 iframe发送代码数据
      iframeRef.current?.contentWindow?.postMessage(data)
    } else if (type === 'ERROR') {
      // error 时，传输错误信息
      setError(message)
    } else {
      setError('')
    }
  }

  useEffect(() => {
    // 收到 iframe 的通知之后哦，进行处理
    window.addEventListener('message', handleMessage)
    return () => {
      // 取消订阅
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  return (
    <>
      <iframe
        key={iframeKey}
        ref={iframeRef}
        src={iframeUrl}
        style={{
          width: '100%',
          height: '100%',
          padding: 0,
          border: 'none',
          display: hidden ? 'none' : '',
        }}
        sandbox='allow-popups-to-escape-sandbox allow-scripts allow-popups allow-forms allow-pointer-lock allow-top-navigation allow-modals allow-same-origin'
      />
      <Message type='error' context={error} />
    </>
  )
}
