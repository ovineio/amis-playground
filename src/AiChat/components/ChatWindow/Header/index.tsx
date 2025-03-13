// TODO:  整理所有 ICON 封装成组件
import CloseIcon from './Close.svg?raw'
import SizeIcon from './Size.svg?raw'

import styles from './index.module.less'

export const Header = () => {
  const storeRef = React.useRef<any>({
    resizeTrigger: null,
    resizeContainer: null,
    isResizing: false,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })

  React.useEffect(() => {
    const { resizeTrigger } = storeRef.current
    if (!resizeTrigger) {
      return
    }

    storeRef.current.resizeContainer = document.querySelector('#aiChatRoot .ChatWrapper')

    storeRef.current.resizeTrigger.addEventListener('mousedown', (e) => {
      const { resizeContainer } = storeRef.current
      storeRef.current = {
        ...storeRef.current,
        isResizing: true,
        x: e.clientX,
        y: e.clientY,
        width: resizeContainer.offsetWidth,
        height: resizeContainer.offsetHeight,
      }
      document.addEventListener('mousemove', resize)
      document.addEventListener('mouseup', stopResize)
    })

    const resize = (e) => {
      const { isResizing, resizeContainer, x, y, width, height } = storeRef.current
      if (isResizing) {
        const newWidth = width + (e.clientX - x)
        const newHeight = height - (e.clientY - y)
        resizeContainer.style.width = `${newWidth}px`
        resizeContainer.style.height = `${newHeight}px`
      }
    }

    const stopResize = () => {
      storeRef.current.isResizing = false
      document.removeEventListener('mousemove', resize)
      document.removeEventListener('mouseup', stopResize)
    }

    return () => {
      storeRef.current.resizeTrigger.removeEventListener('mousedown')
    }
  }, [])

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
