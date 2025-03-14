type Props = {
  container?: any
  trigger?: any
  reactIns: any // 因为 ChatSdk 已经将 React 打包进来了。
}

export const useMoveable = (options: Props) => {
  const { reactIns, container: dragContainer, trigger: dragTrigger } = options

  const storeRef = reactIns.useRef({
    isDragging: false,
    isInitial: false,
    position: {
      x: 0,
      y: 0,
    },
    startPosition: {
      x: 0,
      y: 0,
    },
  })

  reactIns.useEffect(() => {
    if (!dragTrigger || !dragContainer || storeRef.current.isInitial) {
      return
    }

    storeRef.current.isInitial = true

    dragTrigger.addEventListener('mousedown', (e) => {
      e.preventDefault()
      storeRef.current.isDragging = false
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

    const mouseMoveHandler = (e) => {
      const { position } = storeRef.current
      dragContainer.style.left = `${e.clientX - position.x}px`
      dragContainer.style.top = `${e.clientY - position.y}px`
      dragContainer.style.bottom = 'auto'
    }

    const mouseUpHandler = (e) => {
      const { startPosition } = storeRef.current
      const diffX = e.clientX - startPosition.x > 5
      const diffY = e.clientY - startPosition.y > 5
      if (diffX || diffY) {
        storeRef.current.isDragging = true
        e.preventDefault()
      }

      document.removeEventListener('mousemove', mouseMoveHandler)
      document.removeEventListener('mouseup', mouseUpHandler)
    }

    return () => {
      dragTrigger.removeEventListener('mousedown')
    }
  }, [dragContainer])

  return {
    isDragging: () => storeRef.current.isDragging,
  }
}
