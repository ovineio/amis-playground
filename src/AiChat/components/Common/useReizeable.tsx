type Props = {
  container?: any
  trigger?: any
  reactIns: any // 因为 ChatSdk 已经将 React 打包进来了。
}
export const useResizable = (options: Props) => {
  const { reactIns, container: resizeContainer, trigger: resizeTrigger } = options

  const storeRef = reactIns.useRef({
    isResizing: false,
    isInitial: false,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })

  reactIns.useEffect(() => {
    if (!resizeContainer || !resizeTrigger || storeRef.current.isInitial) {
      return
    }

    storeRef.current.isInitial = true
    resizeTrigger.addEventListener('mousedown', (e) => {
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
      const { isResizing, x, y, width, height } = storeRef.current
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
      resizeTrigger.removeEventListener('mousedown')
    }
  }, [resizeContainer, resizeTrigger])

  return {
    isResizing: () => storeRef.current.isResizing,
  }
}
