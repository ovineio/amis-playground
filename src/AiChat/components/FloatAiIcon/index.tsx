import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'

import styles from './index.module.less'

type Props = {
  showWindow?: boolean
  onClick?: any
  children?: any
}
export const FloatAiIcon = (props: Props) => {
  const { onClick, children: ChatWindow, showWindow } = props

  const storeRef = useRef({
    dragContainer: null,
    dragTrigger: null,
    dragFlag: false,
    position: {
      x: 0,
      y: 0,
    },
    startPosition: {
      x: 0,
      y: 0,
    },
  })

  useEffect(() => {
    const { dragContainer, dragTrigger } = storeRef.current
    if (!dragTrigger) {
      return
    }

    const mouseMoveHandler = (e) => {
      const { dragContainer, position } = storeRef.current
      dragContainer.style.left = `${e.clientX - position.x}px`
      dragContainer.style.top = `${e.clientY - position.y}px`
      dragContainer.style.bottom = 'auto'
    }

    const mouseUpHandler = (e) => {
      const { startPosition } = storeRef.current
      const diffX = e.clientX - startPosition.x > 5
      const diffY = e.clientY - startPosition.y > 5
      if (diffX || diffY) {
        storeRef.current.dragFlag = true
        e.preventDefault()
      }

      document.removeEventListener('mousemove', mouseMoveHandler)
      document.removeEventListener('mouseup', mouseUpHandler)
    }

    dragTrigger.addEventListener('mousedown', (e) => {
      e.preventDefault()
      storeRef.current.dragFlag = false
      storeRef.current.startPosition = {
        x: e.clientX,
        y: e.clientY,
      }
      storeRef.current.position = {
        x: e.clientX - dragContainer.offsetLeft,
        y: e.clientY - dragContainer.offsetTop,
      }
      document.addEventListener('mousemove', mouseMoveHandler)
      document.addEventListener('mouseup', mouseUpHandler)
    })

    return () => {
      dragTrigger.removeEventListener('mousedown')
    }
  }, [])

  const handleIconClick = () => {
    if (storeRef.current.dragFlag) {
      return
    }
    onClick()
  }

  return (
    <div className={styles.iconContainer} ref={(ref) => (storeRef.current.dragContainer = ref)}>
      <div
        onClick={handleIconClick}
        className={styles.iconContent}
        ref={(ref) => (storeRef.current.dragTrigger = ref)}
      />
      <div
        className={classNames(styles.iconExpend, {
          [styles.hiddenWindow]: !showWindow,
        })}
      >
        {ChatWindow}
      </div>
    </div>
  )
}
