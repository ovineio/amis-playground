import classNames from 'classnames'
import React, { useRef } from 'react'

import { useMoveable } from '../Common/useMoveable'

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
  })

  const { isDragging } = useMoveable({
    container: storeRef.current.dragContainer,
    trigger: storeRef.current.dragTrigger,
  })

  const handleIconClick = () => {
    if (isDragging()) {
      return
    }
    onClick()
  }

  return (
    <div
      className={styles.iconContainer + ' AiChatEntry'}
      ref={(ref) => (storeRef.current.dragContainer = ref)}
    >
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
