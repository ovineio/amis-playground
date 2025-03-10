import { useEffect, useRef, useState } from 'react'

const loadOverTime = 10 * 1000

export const useTypesProgress = () => {
  const [progress, setProgress] = useState({
    current: 0,
    total: 0,
  })
  const [finished, setFinished] = useState(false)
  const storeRef = useRef({
    finishedMaxTimer: 0,
  })

  useEffect(() => {
    return clearFinishedMaxTimer
  }, [])

  const clearFinishedMaxTimer = () => {
    if (storeRef.current.finishedMaxTimer) {
      clearTimeout(storeRef.current.finishedMaxTimer)
    }
  }

  const onWatch = (typeHelper: any) => {
    const handleProgress = (current: number, total: number) => {
      setProgress({
        current,
        total,
      })
    }
    typeHelper.addListener('progress', handleProgress)

    const handleFinished = () => {
      clearFinishedMaxTimer()
      setFinished(true)
    }
    typeHelper.addListener('finished', () => setFinished(true))

    const handleStarted = () => {
      setFinished(false)
      clearFinishedMaxTimer()
      storeRef.current.finishedMaxTimer = setTimeout(() => {
        handleFinished()
      }, loadOverTime)
    }
    typeHelper.addListener('started', handleStarted)

    return () => {
      typeHelper.removeListener('started', handleStarted)
      typeHelper.removeListener('progress', handleProgress)
      typeHelper.removeListener('finished', handleFinished)
    }
  }

  return { ...progress, finished, onWatch }
}
