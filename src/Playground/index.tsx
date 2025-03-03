import { confirm } from 'amis-ui'
import moment from 'moment'
import React, { useContext, useEffect } from 'react'

import { EditorContainer } from './components/EditorContainer'
import { Header } from './components/Header'
import { setCaseFiles } from './components/Header/utils'
import { Output as OutputBundle } from './components/OutputBundle'
import { SplitPane } from './components/SplitPane'
import { PlaygroundContext, PlaygroundProvider } from './PlaygroundContext'
import { MAIN_FILE_NAME } from './templateAmis/files'
import { getCustomActiveFile, getMergedCustomFiles, getPlaygroundTheme } from './utils'

import type { IPlayground } from './types'

import './index.less'
import { addNewVersion, initCaseTree, checkFilesChangeByVerId } from '@/localServer/caseService'
import { defCaseId } from '@/localServer/caseService/defaultCase'
import { getAppSetting } from '@/localServer/settingService'
import { getShareFormUrl } from '@/localServer/shareService'

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

    const { shareId, share, title } = await getShareFormUrl()
    if (shareId && share) {
      caseId = defCaseId.myShare
      const checkInfo = await checkFilesChangeByVerId(share, caseId, shareId)

      const getVerDefLabel = () => title || `${moment().format('YYMMDD-hh:mm:ss')}`

      // 不存在新版本
      if (checkInfo.versionNotFound) {
        // 直接添加新版本
        caseVersion = await addNewVersion(caseId, getVerDefLabel(), shareId)
        await setCaseFiles({
          caseId,
          caseVersion,
          filesHash: share,
          pristine: true,
          overwritePristine: true,
        })
      } else if (checkInfo.filesChanged) {
        // 如果修改过分享的代码,弹出变更覆盖确认框。在用户选择中做修改
        const isConfirm = await confirm(
          `
          您已浏览过当前分享的代码，并进行了修改。<br/>
          <div class="font-bold">是否丢弃已修改的代码，重置为当前分享代码？</div><br/>
          <div class="text-muted">
            tips: 如果您不想丢弃修改的代码，可按如下步骤操作：
            <br/> 1.进行“取消”操作，将改动代码，进行“新建”版本保存。
            <br/> 2.再次打开该分享链接。
          </div>`,
          '提示',
          {
            confirmBtnLevel: 'primary',
            confirmText: '重置',
          }
        )
        if (isConfirm) {
          caseVersion = checkInfo.version!
          await setCaseFiles({
            caseId,
            caseVersion,
            versionLabel: getVerDefLabel(),
            filesHash: share,
            pristine: true,
            overwritePristine: true,
          })
        }
      }
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
