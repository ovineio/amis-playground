/**
 * 1. 仍然使用 iframe , 用 esbuild 在 worker 编译 (由于worker中无法使用 window 等，直接放弃)
 * 2. 不需要 worker 编译，直接将编译好代码 ， post 到 iframe, 在 iframe 中执行.(放弃原因：1.postmessage只能传string 2.解析的scope无法传入iframe。 )
 * 2. 使用 直接使用 esbuild 编译+预览 （放弃 1,2 的iframe这套）
 */

import React, { useMemo } from 'react'

import { usePreviewComponent } from './bundler'
import dependencies from './dependencies'
import { MAIN_FILE_NAME, ENTRY_FILE_NAME } from '../../templateAmis/files'

import styles from './index.module.less'

import type { IOutput } from '@/Playground/types'

const internalId = 'internalId'

const customRequire = (key: any) => {
  const res = dependencies[key]

  if (res) {
    return res
  }

  throw new Error('DEP: ' + key + ' not found')
}

const propsAreEqual = (prevProps: IOutput, nextProps: IOutput) => {
  const isSame = prevProps.files === nextProps.files
  return isSame
}

const A: React.FC<IOutput> = (props) => {
  const { files } = props

  const filesArr = useMemo(() => {
    const appFile = files[MAIN_FILE_NAME]
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

    return result
  }, [files])

  const { Preview, bundling, error } = usePreviewComponent(internalId, filesArr, customRequire)

  return (
    <div className={styles.panelWrapper}>
      {bundling && !Preview ? 'loading ...' : Preview && <Preview />}
      {error && (
        <div className={styles.panelError}>
          <pre>{error.toString()}</pre>
        </div>
      )}
    </div>
  )
}

export const Output = React.memo(A, propsAreEqual)
