/**
 * 示例选择下拉框
 */
import { uuidv4 } from 'amis-core'
import { get, last } from 'lodash'
import { useContext, useRef } from 'react'

import { checkCaseValid, getNewVersionDialog } from './utils'
import { getCaseFiles, setCaseFiles, setCaseFiles2Pristine } from '../utils'

import styles from './index.module.less'

import { renderAmis, doAmisAction, setAmisValue } from '@/Amis'
import {
  caseType,
  delCaseVersion,
  getCaseVersions,
  updateCaseTree,
} from '@/localServer/caseService'
import { PlaygroundContext } from '@/Playground/PlaygroundContext'
import { getUrlPath, updateLocation } from '@/Playground/utils'

export const SelectCase = () => {
  const { appSetting, setFiles, setAppSetting, filesHash } = useContext(PlaygroundContext)

  const storeRef = useRef<{
    scopeRef: any
    pristineFilesHash: string
    appSetting: any
    caseChanged: boolean
    isInitialSucc: boolean
  }>({
    scopeRef: null,
    pristineFilesHash: '',
    appSetting: {},
    caseChanged: false,
    isInitialSucc: false,
  })

  storeRef.current.appSetting = appSetting

  const caseEnable = appSetting.caseId && appSetting.caseVersion

  const amisData = Object.assign(
    {
      caseEnable,
      resetDisable: storeRef.current.pristineFilesHash === filesHash,
    },
    {
      caseId: appSetting.caseId,
      caseVersion: appSetting.caseVersion,
    }
  )

  const caseIdApiConfig = {
    url: '/getCaseTree?caseId=${caseId}',
    method: 'post',
    data: {
      __changeReason: '${__changeReason|pick:type}',
      __prevCaseId: '${__prev|toJson|pick:caseId}',
    },
    requestAdaptor: (req) => {
      storeRef.current.caseChanged = false // 关闭标记
      return req
    },
    dataProvider: async (req) => {
      let { caseId } = req.query

      // start: 检验 caseId
      const { validCaseItem, caseTree } = await checkCaseValid(caseId)
      // 如果已经初始化过，（caseId 为空，是用户手动点击清除按钮）
      if (storeRef.current.isInitialSucc && !caseId) {
        doAmisAction(
          storeRef,
          {
            type: 'setValue',
            id: 'casePickerForm',
            args: {
              value: {
                caseVersion: '',
              },
            },
          },
          {
            type: 'reload', // 刷新 versions
            id: 'casePicker_caseVersion',
          }
        )
        return {
          data: caseTree,
        }
      }
      // 其他情况下，使用有效caseId
      caseId = validCaseItem.value
      // end

      // start: 检验 caseVersion
      // TODO: 优化此处，太容易出BUG了
      const { __changeReason, __prevCaseId } = req.data
      const formRef = storeRef.current.scopeRef.getComponentById('casePickerForm')
      const formData = formRef?.emittedData || formRef?.props?.data || {}
      let { caseVersion } = formData || {} // 获取当前最新的 caseVersion

      const changeCaseId = __changeReason === 'input' && __prevCaseId !== caseId
      const versions = await getCaseVersions(caseId)
      const caseVersionErr = !versions.find((item) => item.value === caseVersion)
      // 重置为第一个版本
      if (changeCaseId || caseVersionErr) {
        caseVersion = get(versions, '0.value')
      }
      // end

      storeRef.current.caseChanged = true // 开启标记
      storeRef.current.isInitialSucc = true // 标记初始化成功
      doAmisAction(
        storeRef,
        {
          type: 'setValue',
          id: 'casePickerForm',
          args: {
            value: {
              reloadId: uuidv4(), // 触发form change
              caseId,
              caseVersion,
            },
          },
        },
        {
          type: 'reload', // 刷新 versions
          id: 'casePicker_caseVersion',
        }
      )

      return {
        data: caseTree,
      }
    },
  }

  const caseVersionApiConfig = {
    url: '/getCaseVersion',
    method: 'post',
    data: {
      caseId: '${caseId}',
    },
    dataProvider: async (req) => {
      const { caseId } = req.data
      const versions = await getCaseVersions(caseId)
      const options = versions.map((item) => ({
        label: `V${item.value}: ${item.label}`,
        value: item.value,
        count: versions.length,
      }))

      return {
        data: {
          data: options,
        },
      }
    },
  }

  const handleCaseChange = async (options) => {
    const { data } = options

    const { activeFileTab } = storeRef.current.appSetting
    const { caseChanged } = storeRef.current
    setAmisValue(storeRef, 'casePickerForm', {
      resetDisableByNew: false,
    })
    if (!caseChanged) {
      return
    }

    const { caseId, caseVersion } = data

    if (!caseId || !caseVersion) {
      return
    }

    // 切换时，如果没有设置，设置pristine
    const { files = {}, filesHash } = await getCaseFiles({
      caseId,
      caseVersion,
      withHash: true,
    })
    const { pristineFilesHash = '' } = await setCaseFiles({
      caseId,
      caseVersion,
      filesHash,
      pristine: true,
      onlyPristine: true,
      returnCaseInfo: true,
      withHash: true,
      withJson: false,
    })

    const fileName = files[activeFileTab]
    await setAppSetting({
      caseId,
      caseVersion,
      shareTitle: `${
        document.querySelector<HTMLSpanElement>('.casePicker_caseId .cxd-ResultBox-singleValue')
          ?.innerText || '示例'
      } @ ${
        document.querySelector<HTMLSpanElement>('.casePicker_caseVersion .cxd-Select-value')
          ?.innerText || 'V1'
      }`,
      activeFileTab: fileName ? activeFileTab : Object.keys(files)[0],
    })

    storeRef.current.pristineFilesHash = pristineFilesHash
    setFiles(files)

    updateLocation(
      getUrlPath({
        caseId,
        caseVersion,
      })
    )
  }

  const setCurrVerPristine = async (
    nextCaseId: string,
    nextVersion: string,
    nextPristineFilesHash: string
  ) => {
    const { caseId, caseVersion } = appSetting
    if (caseId === nextCaseId && `${caseVersion}` === nextVersion) {
      storeRef.current.pristineFilesHash = nextPristineFilesHash
    } else {
      // 还原上一个版本代码
      await setCaseFiles2Pristine({
        caseId,
        caseVersion,
      })
    }
    // 刚刚保存完新版本，直接将“重置”禁用
    setAmisValue(storeRef, 'casePickerForm', {
      resetDisableByNew: true,
    })
  }

  const handleReset = async (options) => {
    const { data } = options
    const { caseId, caseVersion } = data
    const { pristineFiles } = await getCaseFiles({
      caseId,
      caseVersion,
      pristine: true,
    })
    setFiles(pristineFiles)
  }

  const handleDelete = async (options) => {
    const { data } = options

    const { caseId, caseVersion, versionCount } = data
    const onlyVersion = versionCount <= 1
    const newData: {
      caseId?: string
      caseVersion?: number
    } = {}

    if (onlyVersion) {
      const { caseItem, firstValidCaseItem } = await checkCaseValid(caseId)
      // 如果当前case存在子示例，则不删除
      const hasChildCase = (caseItem?.children?.length || 0) > 0

      // 用户创建的可以整个删除case
      if (caseType.formUserCreated(caseId) && !hasChildCase) {
        await updateCaseTree('delete', { value: caseId })
      } else {
        // 非用户创建的，只删除对应的版本即可
        await delCaseVersion(caseId, caseVersion)
      }

      if (firstValidCaseItem) {
        newData.caseId = firstValidCaseItem.value
      }
    } else {
      await delCaseVersion(caseId, caseVersion)
      const versions = await getCaseVersions(caseId)
      // 默认回退到倒数第一个版本（符合使用习惯）
      const newCaseVersion = last(versions)?.value
      if (newCaseVersion) {
        newData.caseVersion = newCaseVersion
      }
    }

    doAmisAction(
      storeRef,
      {
        type: 'setValue',
        id: 'casePickerForm',
        args: {
          value: newData,
        },
      },
      onlyVersion
        ? false
        : {
            type: 'reload',
            id: 'casePicker_caseVersion',
          },
      {
        type: 'close',
        id: 'deleteCaseDialog',
      }
    )

    return {
      data: {},
    }
  }

  if (!appSetting.initial) {
    return null
  }

  return (
    <>
      {renderAmis(
        {
          type: 'form',
          className: styles.selectCase,
          wrapWithPanel: false,
          mode: 'inline',
          id: 'casePickerForm',
          body: [
            {
              type: 'tree-select',
              name: 'caseId',
              id: 'casePicker_caseId',
              className: 'casePicker_caseId mr-0',
              label: false,
              searchable: true,
              placeholder: '请选择示例',
              enableDefaultIcon: false,
              source: caseIdApiConfig,
            },
            {
              type: 'tpl',
              className: 'ml-1 mr-1',
              tpl: '-',
            },
            {
              type: 'select',
              label: false,
              name: 'caseVersion',
              id: 'casePicker_caseVersion',
              className: 'casePicker_caseVersion',
              placeholder: '版本',
              autoFill: {
                versionCount: '${count}',
              },
              source: caseVersionApiConfig,
            },
            {
              type: 'button-group',
              className: 'ml-4',
              buttons: [
                {
                  type: 'button',
                  label: '新建',
                  tooltip: '基于当前代码新建或覆盖示例',
                  actionType: 'dialog',
                  disabledOn: '${!caseId || !caseVersion}',
                  disabledTip: '请选择示例',
                  level: 'primary',
                  dialog: getNewVersionDialog({
                    storeRef,
                    filesHash,
                    setCurrVerPristine,
                  }),
                },
                {
                  type: 'button',
                  label: '重置',
                  // TODO: 修复重置 按钮会闪动1下
                  disabledOn: '${!caseId || !caseVersion || resetDisable || resetDisableByNew}',
                  tooltip: '清除当前版本改动',
                  disabledTip: '当前版本代码无变更',
                  onEvent: {
                    click: {
                      actions: [
                        {
                          actionType: 'custom',
                          script: (_context, _doAction, event) => {
                            handleReset({
                              data: event.data,
                            })
                          },
                        },
                      ],
                    },
                  },
                },
                {
                  type: 'button',
                  label: '删除',
                  tooltip: '删除该版本示例',
                  disabledOn: '${&|app_disabledCaseRemove}',
                  disabledTip: '内置默认版本无法删除',
                  actionType: 'dialog',
                  dialog: {
                    id: 'deleteCaseDialog',
                    title: '提示',
                    body: `删除该版本，会同时删除该版本对应的代码。如果该示例只有一个版本，会同时删除该示例。`,
                    actions: [
                      {
                        type: 'action',
                        actionType: 'close',
                        label: '取消',
                      },
                      {
                        type: 'action',
                        level: 'primary',
                        label: '确认',
                        onEvent: {
                          click: {
                            actions: [
                              {
                                actionType: 'custom',
                                script: (_contenxt, _doAction, event) => {
                                  handleDelete({
                                    data: event.data,
                                  })
                                },
                              },
                            ],
                          },
                        },
                      },
                    ],
                  },
                },
              ],
            },
          ],
          onEvent: {
            change: {
              actions: [
                {
                  actionType: 'custom',
                  script: (_formRef, _doAction, event) => {
                    handleCaseChange({
                      data: event.data,
                    })
                  },
                },
              ],
            },
          },
        },
        {
          data: amisData,
          scopeRef: (ref: any) => {
            storeRef.current.scopeRef = ref
          },
        }
      )}
    </>
  )
}
