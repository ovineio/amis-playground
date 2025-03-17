// TODO:  整理所有 ICON 封装成组件
import { useEffect, useRef } from 'react'

import CloseIcon from './assets/Close.svg?raw'
import MoveIcon from './assets/Move.svg?raw'
import SizeIcon from './assets/Size.svg?raw'
import { useMoveable } from '../../Common/useMoveable'
import { useResizable } from '../../Common/useReizeable'

import styles from './index.module.less'

export const Header = () => {
  const storeRef = useRef({
    resizeTrigger: null,
    resizeContainer: null,
    dragContainer: null,
    dragTrigger: null,
    isResizing: false,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })

  useEffect(() => {
    const aiRoot = document.querySelector('#aiChatRoot')

    storeRef.current.resizeContainer = aiRoot.querySelector('.ChatWrapper')
    storeRef.current.dragContainer = aiRoot.querySelector('.AiChatEntry')
  }, [])

  useMoveable({
    container: storeRef.current.dragContainer,
    trigger: storeRef.current.dragTrigger,
  })

  useResizable({
    container: storeRef.current.resizeContainer,
    trigger: storeRef.current.resizeTrigger,
  })

  const handleClose = () => {
    window.postMessage({
      action: 'closeChatWindow',
    })
  }

  return (
    <div className={styles.wrapper}>
      <i></i>
      <span>Amis Bot</span>
      <div className={styles.right}>
        <button
          title='移动位置'
          className={styles.move}
          ref={(ref) => (storeRef.current.dragTrigger = ref)}
          dangerouslySetInnerHTML={{ __html: MoveIcon }}
        />
        <button
          title='调整大小'
          className={styles.resize}
          ref={(ref) => (storeRef.current.resizeTrigger = ref)}
          dangerouslySetInnerHTML={{ __html: SizeIcon }}
        />
        <button
          title='关闭'
          className={styles.close}
          onClick={handleClose}
          dangerouslySetInnerHTML={{ __html: CloseIcon }}
        />
      </div>
    </div>
  )
}
