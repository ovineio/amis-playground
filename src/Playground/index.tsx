import { alert, confirm } from 'amis-ui'
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
import {
  addNewVersion,
  initCaseTree,
  checkFilesChangeByVerId,
  updateVersionLabel,
  caseType,
} from '@/localServer/caseService'
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
    onFilesChange,
  } = props
  const {
    appSetting,
    filesHash,
    changeTheme,
    files,
    setFiles,
    setSelectedFileName,
    setAppSetting,
  } = useContext(PlaygroundContext)
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

    /**
     *  start: 处理分享相关逻辑
     *  TODO: 将z这整块单独抽离一个方法
     */
    const shareData = await getShareFormUrl()

    if (shareData?.isShortUrlExpired) {
      alert('当前打开的分享链接已过期', '提示')
    } else if (shareData) {
      const { share, title, shareId } = shareData
      caseId = defCaseId.myShare
      const checkInfo = await checkFilesChangeByVerId(share, caseId, shareId)

      caseVersion = checkInfo.version!

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
          <div class="font-bold pt-1">是否丢弃已修改的代码，重置为当前分享的代码？</div><br/>
          <div class="text-muted">
            tips: 如果您不想丢弃修改的代码，可按如下步骤操作：
            <br/> 1.进行“取消”操作，将已改动的代码，进行“新建”版本保存。
            <br/> 2.再次打开该分享链接。
          </div>`,
          '提示',
          {
            confirmBtnLevel: 'primary',
            confirmText: '重置',
          }
        )
        if (isConfirm) {
          await setCaseFiles({
            caseId,
            caseVersion,
            versionLabel: getVerDefLabel(),
            filesHash: share,
            pristine: true,
            overwritePristine: true,
          })
        }
      } else {
        // 代码相同时，调整版本label
        await updateVersionLabel(caseId, caseVersion, getVerDefLabel())
      }
    }
    // end

    /**
     * start: 官方提供的示例，可从URL上进行分享打开
     */
    const query = new URLSearchParams(location.search)
    const queryCaseId = query.get('caseId')
    const queryCaseVersion = query.get('caseId')
    if (
      queryCaseId &&
      queryCaseVersion &&
      caseType.officialPristine(queryCaseId, queryCaseVersion)
    ) {
      caseId = queryCaseId
      caseVersion = parseInt(queryCaseVersion)
    }
    // end

    if (caseId && caseVersion) {
      appSetting = {
        ...appSetting,
        caseId,
        caseVersion,
      }
    }

    await setAppSetting({
      initial: true,
      ...appSetting,
    })
  }

  useEffect(() => {
    initPlayGroundData()
  }, [])

  return (
    <div
      data-id='amis-playground'
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
        <SplitPane defaultSizes={appSetting.splitPaneSize}>
          <EditorContainer
            options={options}
            showFileSelector={showFileSelector}
            fileSelectorReadOnly={fileSelectorReadOnly}
          />
          <OutputBundle
            autoRun={appSetting.autoRun}
            codeRunId={appSetting.codeRunId}
            files={files}
          />
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
