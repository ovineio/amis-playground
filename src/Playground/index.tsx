import moment from 'moment'
import React, { useContext, useEffect } from 'react'

import { EditorContainer } from './components/EditorContainer'
import { Header } from './components/Header'
import { setCaseFiles } from './components/Header/utils'
import { Output as OutputBundle } from './components/OutputBundle'
import { SplitPane } from './components/SplitPane'
import { PlaygroundContext, PlaygroundProvider } from './PlaygroundContext'
import { MAIN_FILE_NAME } from './templateAmis/files'
import {
  getCustomActiveFile,
  getFilesHashFromUrl,
  getMergedCustomFiles,
  getPlaygroundTheme,
} from './utils'

import type { IPlayground } from './types'

import './index.less'
import { addNewVersion, initCaseTree } from '@/localServer/caseService'
import { getAppSetting } from '@/localServer/settingService'

const defaultCodeSandboxOptions = {
  theme: 'dark',
  editorHeight: '100vh',
  showUrlHash: true,
}

const ReactPlayground = (props: IPlayground) => {
  const {
    width = '100vw',
    height = '100vh',
    theme,
    files: propsFiles,
    importMap,
    showHeader = true,
    showFileSelector = true,
    fileSelectorReadOnly = false,
    border = false,
    defaultSizes,
    onFilesChange,
    autorun = true,
  } = props
  const { filesHash, changeTheme, files, setFiles, setSelectedFileName, setAppSetting } =
    useContext(PlaygroundContext)
  const options = Object.assign(defaultCodeSandboxOptions, props.options || {})

  useEffect(() => {
    if (propsFiles && !propsFiles?.[MAIN_FILE_NAME]) {
      throw new Error(
        `Missing required property : '${MAIN_FILE_NAME}' is a mandatory property for 'files'`
      )
    } else if (propsFiles) {
      const newFiles = getMergedCustomFiles(propsFiles, importMap)
      if (newFiles) setFiles(newFiles)
      const selectedFileName = getCustomActiveFile(propsFiles)
      if (selectedFileName) setSelectedFileName(selectedFileName)
    }
  }, [propsFiles])

  useEffect(() => {
    onFilesChange?.(filesHash)
  }, [filesHash])

  useEffect(() => {
    setTimeout(() => {
      if (!theme) {
        changeTheme(getPlaygroundTheme())
      } else {
        changeTheme(theme)
      }
    }, 15)
  }, [theme])

  const initPlayGroundData = async () => {
    await initCaseTree()
    let appSetting = await getAppSetting()
    let caseId = appSetting.caseId || 'baseSimple'
    let caseVersion = appSetting.caseVersion || 1

    const shareFilesHash = getFilesHashFromUrl()
    if (shareFilesHash) {
      caseId = 'myShare'
      caseVersion = await addNewVersion(caseId, `T-${moment().format('YYMMDD-hh:mm:ss')}`)
      await setCaseFiles(caseId, caseVersion, shareFilesHash, true)

      // 删除 share 参数
      const urlQuery = new URLSearchParams(location.search)
      urlQuery.delete('share')
      const newUrl = location.origin + location.pathname + '?' + urlQuery.toString()
      history.replaceState({}, '', newUrl)
    }

    if (caseId && caseVersion) {
      appSetting = {
        ...appSetting,
        caseId,
        caseVersion,
      }
    }

    setAppSetting({
      initial: true,
      ...appSetting,
    })
  }

  useEffect(() => {
    initPlayGroundData()
  }, [])

  return (
    <div
      data-id='react-playground'
      className={theme}
      style={{
        width,
        height,
        boxSizing: 'border-box',
        border: border ? '1px solid var(--border)' : '',
      }}
    >
      {showHeader ? <Header /> : null}
      <div style={{ height: `calc(100% - ${showHeader ? 50 : 0}px)` }}>
        <SplitPane defaultSizes={defaultSizes}>
          <EditorContainer
            options={options}
            showFileSelector={showFileSelector}
            fileSelectorReadOnly={fileSelectorReadOnly}
          />
          {autorun ? <OutputBundle files={files} /> : null}
        </SplitPane>
      </div>
    </div>
  )
}

export const Playground: React.FC<IPlayground> = (props) => {
  return (
    <PlaygroundProvider saveOnUrl={props.saveOnUrl}>
      <ReactPlayground {...props} />
    </PlaygroundProvider>
  )
}
