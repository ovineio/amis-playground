import { isEmpty } from 'lodash'
import React, { useContext, useRef, useState } from 'react'

import { Editor } from './Editor'
import { FileSelector } from './FileSelector'
import { Loading } from '../Loading'
import { Message } from '../Message'

import styles from './index.module.less'

import { useDebounceFn } from '@/Playground/hooks'
import { PlaygroundContext } from '@/Playground/PlaygroundContext'
import type { IEditorContainer } from '@/Playground/types'

export const EditorContainer: React.FC<IEditorContainer> = (props) => {
  const { showFileSelector, fileSelectorReadOnly, options = {} } = props
  const { files, setFiles, appSetting, setAppSetting } = useContext(PlaygroundContext)
  const [error, setError] = useState('')
  const file = files[appSetting.activeFileTab] || {}

  const storeRef = useRef<any>({})
  storeRef.current = file

  const { run: handleEditorChange } = useDebounceFn(
    (value: string) => {
      setFiles((prev) => {
        const cacheFile = storeRef.current
        const newFiles = { ...prev }
        newFiles[cacheFile.name] = {
          ...cacheFile,
          value,
        }
        return newFiles
      })
    },
    {
      wait: 250,
    }
  )

  const handleTabsChange = (fileName: string) => {
    setAppSetting({
      activeFileTab: fileName,
    })
  }

  const handleTabsError = (msg: string) => {
    setError(msg)
  }

  if (isEmpty(files)) {
    return (
      <div className={styles.container}>
        <div className={styles.loaderHolder}>
          <Loading size='lg' text='loading' />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {showFileSelector ? (
        <FileSelector
          onChange={handleTabsChange}
          onError={handleTabsError}
          readOnly={fileSelectorReadOnly}
        />
      ) : null}
      <Editor
        theme={appSetting.theme}
        setAppSetting={setAppSetting}
        files={files}
        fileName={file.name}
        fileValue={file.value}
        onValueChange={handleEditorChange}
        options={options}
      />
      <Message type='error' context={error} />
    </div>
  )
}
