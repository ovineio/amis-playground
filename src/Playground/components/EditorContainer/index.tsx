import { isEmpty } from 'lodash'
import React, { useContext, useState } from 'react'

import { Editor } from './Editor'
import { FileSelector } from './FileSelector'
import { Loading } from '../Loading'
import { Message } from '../Message'

import styles from './index.module.less'

import { PlaygroundContext } from '@/Playground/PlaygroundContext'
import type { IEditorContainer } from '@/Playground/types'
import { debounce } from '@/Playground/utils'

export const EditorContainer: React.FC<IEditorContainer> = (props) => {
  const { showFileSelector, fileSelectorReadOnly, options = {} } = props
  const { files, setFiles, appSetting, setAppSetting } = useContext(PlaygroundContext)
  const [error, setError] = useState('')
  const file = files[appSetting.activeFileTab] || {}

  const handleEditorChange = debounce((value: string) => {
    files[file.name].value = value
    setFiles({ ...files })
  }, 250)

  const handleTabsChange = (fileName: string) => {
    setAppSetting({
      activeFileTab: fileName
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
      <Editor onChange={handleEditorChange} file={file} options={options} />
      <Message type='error' context={error} />
    </div>
  )
}
