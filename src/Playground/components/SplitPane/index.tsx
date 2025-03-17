// @ts-ignore
import { Allotment } from 'allotment'
import classnames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'

import styles from './index.module.less'

import { setAppSetting } from '@/localServer/settingService'
import { useDebounceFn } from '@/Playground/hooks'
import type { ISplitPane } from '@/Playground/types'

import 'allotment/dist/style.css'

export const SplitPane: React.FC<ISplitPane> = (props) => {
  const { defaultSizes, saveSplit = false } = props

  const SplitLinePosition = {
    LEFT: [0, Infinity],
    CENTER: [100, 100],
    RIGHT: [Infinity, 0],
  }

  const [reloadId, setReloadId] = useState(0)
  const ref = useRef<any>(null)
  const storeRef = useRef({
    size: [],
  })

  useEffect(() => {
    if (defaultSizes?.length) {
      ref.current?.resize(defaultSizes)
    }
  }, [defaultSizes])

  const hiddenLeft = storeRef.current.size[0] === 0
  const hiddenRight = storeRef.current.size[1] === 0
  const visibleLeft = storeRef.current.size[1] === 0
  const visibleRight = storeRef.current.size[0] === 0

  const setSize = (size: number[]) => {
    storeRef.current.size = size
    ref.current?.resize(size)
    setReloadId(reloadId + 1)
  }

  const handleCollapseLeft = () => {
    const [_left, right] = storeRef.current.size
    if (right === 0) {
      setSize(SplitLinePosition.CENTER)
    } else {
      setSize(SplitLinePosition.LEFT)
    }
  }

  const handleCollapseRight = () => {
    const [left, _right] = storeRef.current.size
    if (left === 0) {
      setSize(SplitLinePosition.CENTER)
    } else {
      setSize(SplitLinePosition.RIGHT)
    }
  }

  const { run: handleChange } = useDebounceFn(
    (size: number[]) => {
      storeRef.current.size = size
      if (saveSplit) {
        setAppSetting({
          splitPaneSize: size,
        })
      }
      if (size.includes(0)) {
        setReloadId(reloadId + 1)
      }
    },
    {
      wait: 500,
    }
  )

  return (
    <Allotment ref={ref} defaultSizes={[100, 100]} onChange={handleChange}>
      <Allotment.Pane snap minSize={0}>
        {props.children?.[0]}
        <div
          className={classnames(styles['collapse-left'], {
            [styles.active]: hiddenRight,
            [styles.visible]: visibleLeft,
          })}
        >
          <div className={styles['collapse-btn']} onClick={handleCollapseLeft}></div>
        </div>
      </Allotment.Pane>

      <Allotment.Pane snap minSize={0}>
        <div
          className={classnames(styles['collapse-right'], {
            [styles.active]: hiddenLeft,
            [styles.visible]: visibleRight,
          })}
        >
          <div className={styles['collapse-btn']} onClick={handleCollapseRight}></div>
        </div>
        {props.children?.[1]}
      </Allotment.Pane>
    </Allotment>
  )
}
