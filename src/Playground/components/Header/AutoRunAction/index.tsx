import { TooltipWrapper } from 'amis-ui'
import React, { useContext, useEffect, useRef } from 'react'

import styles from '../index.module.less'

import { PlaygroundContext } from '@/Playground/PlaygroundContext'
import { isMac } from '@/Playground/utils'

const ctrlKey = isMac() ? 'Cmd' : 'Ctrl'

export const AutoRunAction: React.FC = () => {
  const { appSetting, setAppSetting } = useContext(PlaygroundContext)

  const storeRef = useRef({
    autoRun: false,
    codeRunId: 0,
  })
  storeRef.current = {
    autoRun: appSetting.autoRun,
    codeRunId: appSetting.codeRunId || 0,
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    window.addEventListener('message', ({ data }) => {
      const { action } = data || {}
      switch (action) {
        case 'Ctrl+S':
          handleCompile()
          break
        case 'Ctrl+E':
          handleToggleAutoRun()
          break
      }
    })
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const preventDefault = (e) => {
    e.stopPropagation()
    e.preventDefault()
    return false
  }

  const handleKeyDown = (e) => {
    // Ctrl + S (编译1次)
    if (e.keyCode === 83 && (e.ctrlKey || e.metaKey)) {
      handleCompile()
      return preventDefault(e)
    }
    // Ctrl + E（切换是否编译）
    if (e.keyCode === 69 && (e.ctrlKey || e.metaKey)) {
      handleToggleAutoRun()
      return preventDefault(e)
    }
  }

  const handleCompile = () => {
    console.log('handleCompile')
    setAppSetting({
      codeRunId: storeRef.current.codeRunId + 1,
    })
  }

  const handleToggleAutoRun = () => {
    setAppSetting({
      autoRun: !storeRef.current.autoRun,
    })
  }

  return (
    <TooltipWrapper
      placement='bottom'
      tooltip={
        appSetting.autoRun
          ? `已开启自动编译（${ctrlKey}+E 切换）`
          : `已关闭自动编译（${ctrlKey}+S 编译）`
      }
    >
      <button
        className={`${appSetting.autoRun ? styles.greenColor : ''}`}
        onClick={handleToggleAutoRun}
      >
        AutoRun:{appSetting.autoRun ? 'ON' : 'OFF'}
      </button>
    </TooltipWrapper>
  )
}
