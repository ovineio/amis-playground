import { debounce } from 'lodash'
import { useEffect, useMemo, useRef } from 'react'

export function useDebounceFn(fn: any, options?: any) {
  const fnRef = useRef(fn)
  fnRef.current = fn

  const wait = options?.wait ?? 1000

  const debounced = useMemo(
    () =>
      debounce(
        (...args: any[]) => {
          return fnRef.current(...args)
        },
        wait,
        options
      ),
    []
  )

  useEffect(() => {
    return () => {
      debounced.cancel()
    }
  }, [])

  return {
    run: debounced,
    cancel: debounced.cancel,
    flush: debounced.flush,
  }
}
