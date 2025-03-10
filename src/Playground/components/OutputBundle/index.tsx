/**
 * TODO: 最终方案是使用iframe隔离。目前暂时使用方案3
 * 1. 仍然使用 iframe , 用 esbuild 在 worker 编译 (由于worker中无法使用 window 等，直接放弃)
 * 2. 不需要 worker 编译，直接将编译好代码 ， post 到 iframe, 在 iframe 中执行.(放弃原因：1.postmessage只能传string 2.解析的scope无法传入iframe。 )
 * 3. 使用 直接使用 esbuild 编译+预览 （放弃 1,2 的iframe这套）
 */

import { anyChanged } from 'amis-core'
import React, { useEffect, useMemo, useRef, useState } from 'react'

import { usePreviewComponent } from './bundler'
import dependencies from './dependencies'
import { MAIN_FILE_NAME, ENTRY_FILE_NAME } from '../../templateAmis/files'
import { Loading } from '../Loading'
import { Message } from '../Message'

import styles from './index.module.less'

import type { IOutput } from '@/Playground/types'

const internalId = 'PreviewInternalId'

const customRequire = (key: any) => {
  const res = dependencies[key]

  if (res) {
    return res
  }

  throw new Error('DEP: ' + key + ' not found')
}

const propsAreEqual = (prevProps: IOutput, nextProps: IOutput) => {
  const isSame = !anyChanged(['files', 'autoRun', 'codeRunId'], prevProps, nextProps)
  return isSame
}

const OutputBundle: React.FC<IOutput> = (props) => {
  const { files, codeRunId, autoRun } = props

  const storeRef = useRef<{ filesArr: any; codeRunId: number; compileTimer: any }>({
    codeRunId: 0,
    filesArr: [],
    compileTimer: 0,
  })

  useEffect(() => {
    storeRef.current.codeRunId = codeRunId || 0
  })

  const codeIdChange = storeRef.current.codeRunId !== codeRunId
  const isNotAutoRun = !autoRun && storeRef.current.filesArr.length

  const filesArr = useMemo(() => {
    const appFile = files[MAIN_FILE_NAME]
    if (!appFile) {
      return []
    }

    if (isNotAutoRun && !codeIdChange) {
      return storeRef.current.filesArr
    }

    const result = [
      {
        filename: appFile.name,
        code: appFile.value,
      },
    ]

    Object.keys(files).map((fileName) => {
      if (![MAIN_FILE_NAME, ENTRY_FILE_NAME].includes(fileName)) {
        const file = files[fileName]
        result.push({
          filename: file.name,
          code: file.value,
        })
      }
    })

    storeRef.current.filesArr = result

    return result
  }, [files, autoRun, codeRunId])

  const { Preview, bundling, error } = usePreviewComponent(internalId, filesArr, customRequire)

  // 保持 Ctrl+S 最少350ms 动画展示
  const [compiling, setCompiling] = useState(false)
  useEffect(() => {
    if (storeRef.current.compileTimer) {
      clearTimeout(storeRef.current.compileTimer)
    }

    setCompiling(true)
    storeRef.current.compileTimer = setTimeout(() => {
      if (storeRef) {
        setCompiling(false)
      }
    }, 350)
  }, [codeIdChange])

  return (
    <div className={styles.panelWrapper}>
      {bundling && !Preview ? (
        <div className={styles.loaderHolder}>
          <Loading size='lg' text='loading' />
        </div>
      ) : (
        Preview && <Preview />
      )}
      <Message type='error' context={error} />
      {compiling && (
        <div className={styles.compileLoading}>
          <Loading />
        </div>
      )}
    </div>
  )
}

export const Output = React.memo(OutputBundle, propsAreEqual)
