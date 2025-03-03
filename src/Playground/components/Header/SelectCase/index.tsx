import { findTree, mapTree, registerFilter } from 'amis-core'
import { get } from 'lodash'
import { useContext, useRef } from 'react'

import { getCaseFiles, setCaseFiles, setCaseFiles2Pristine } from '../utils'

import {
  caseType,
  delCaseVersion,
  getCasesTree,
  getCaseVersions,
  isCaseHasFiles,
  setCaseVersions,
  updateCaseTree,
} from '@/localServer/caseService'
import { renderAmis } from '@/Playground/components/Amis'
import { PlaygroundContext } from '@/Playground/PlaygroundContext'

const getVersionUpdateAction = (options = {}) => {
  const { changeByCaseId = false } = options

  const actionConfig = {
    actionType: 'custom',
    script: async (context, doAction, event) => {
      let { caseId, caseVersion } = event.data

      if (!caseId) {
        return
      }

      const versions = await getCaseVersions(caseId)
      // 如果 caseId 发生变更，先将选中版本进行 换成第一个可用版本
      caseVersion = changeByCaseId ? get(versions, `0.value`) || 1 : caseVersion

      const maxVersion = Math.max(...versions.map((item) => item.value))
      const caseHasFiles = await isCaseHasFiles(caseId, caseVersion)
      const options = versions
        .concat(
          // 分享 或者 当前版本不存在代码时， 不允许增加版本
          caseType.formShare(caseId) || !caseHasFiles
            ? []
            : [
                {
                  value: maxVersion + 1,
                  desc: '',
                },
              ]
        )
        .map((item) => {
          return {
            value: item.value,
            // 官方代码不允许覆盖
            disabled: caseType.officialPristine(caseId, item.value),
            label: `V${item.value}`,
            desc: item.desc || item.label,
          }
        })

      let defSelectItem: any
      options.some((item) => {
        // 禁用的不能被选中
        if (item.disabled) {
          return false
        }
        // 默认选中第一个没有禁用的
        if (!defSelectItem) {
          defSelectItem = item
        }
        // 如果是切换case 的场景，直接选中第一个可选的
        if (changeByCaseId) {
          return true
        }
        // 如果是首次进入场景，则选中当前选中的
        if (item.value === caseVersion) {
          defSelectItem = item
          return true
        }
      })

      const newValue = {
        caseVersion: defSelectItem?.value || 1,
        caseVersionOptions: options,
      }

      doAction([
        {
          actionType: 'setValue',
          componentId: 'newVersionForm',
          args: {
            value: newValue,
          },
        },
      ])
    },
  }

  return actionConfig
}

const getNewVersionDialog = (options = {}) => {
  const { filesHash, setCurrVerPristine } = options
  const dialogConfig = {
    title: '新建示例',
    onEvent: {
      cancel: {
        actions: [
          {
            actionType: 'reload',
            componentId: 'casePicker_caseId',
          },
        ],
      },
    },
    body: [
      {
        type: 'alert',
        body: `
          1.可以在“示例”的下拉选项中，动态调整所需要的示例。<br/> 
          2.可以在"版本"的下拉框中，调整代码存放的版本。<br/>
          3.如果选择的示例+版本已经存在，会覆盖对应的代码作为基础代码。如果不存在，则会清除当前版本的改动，将代码存放到所选择的示例中。
        `,
        level: 'info',
        showIcon: true,
        className: 'mb-4',
      },
      {
        type: 'form',
        id: 'newVersionForm',
        // debug: true,
        onEvent: {
          inited: {
            actions: [getVersionUpdateAction()],
          },
          submitSucc: {
            actions: [
              {
                actionType: 'setValue',
                componentId: 'casePickerForm',
                args: {
                  value: {
                    caseId: '${caseId}',
                    caseVersion: '${caseVersion}',
                  },
                },
              },
              {
                actionType: 'reload',
                componentId: 'casePicker_caseId',
              },
              {
                actionType: 'reload',
                componentId: 'casePicker_caseVersion',
              },
            ],
          },
        },
        api: {
          url: '/',
          dataProvider: async (req) => {
            const { versionDsc, caseVersionOptions, caseId, caseVersion } = req.data

            const newVersions = caseVersionOptions.flatMap((item) => {
              const newItem = {
                value: item.value,
              }
              if (item.value === caseVersion) {
                newItem.label = versionDsc
              } else {
                newItem.label = item.desc
              }

              return newItem.label ? [newItem] : []
            })

            await setCaseVersions(caseId, newVersions)

            const { pristineFilesHash = '' } = await setCaseFiles({
              caseId,
              caseVersion,
              filesHash,
              pristine: true,
              overwritePristine: true,
              returnCaseInfo: true,
              withHash: true,
              withJson: false,
            })
            await setCurrVerPristine(caseId, caseVersion, pristineFilesHash)

            return {
              data: {},
            }
          },
        },
        body: [
          {
            type: 'tree-select',
            name: 'caseId',
            clearable: true,
            required: true,
            creatable: true,
            removable: true,
            editable: true,
            rootCreatable: false,
            label: '选择示例',
            searchable: true,
            placeholder: '请选择示例',
            className: 'mr-0',
            onlyLeaf: true,
            enableDefaultIcon: false,
            deleteConfirmText: '删除该示例，将会同时删除该示例各个版本所保存的代码。',
            source: {
              url: '/',
              dataProvider: async () => {
                const caseTree = await getCasesTree()
                const options = mapTree(caseTree, (item) => {
                  const userCreated = caseType.formUserCreated(item.value)
                  return {
                    ...item,
                    // hidden: item.value === 'myShare',
                    disabled: caseType.formMyCase(item.value) ? false : item.disabled,
                    creatable: userCreated || caseType.formCustom(item.value),
                    editable: userCreated || caseType.formMyCase(item.value, false),
                    removable: userCreated,
                  }
                })

                return {
                  data: options,
                }
              },
            },
            addApi: {
              url: '/',
              dataProvider: async (req) => {
                await updateCaseTree('addChild', req.data)
                return {
                  data: {},
                }
              },
            },
            editApi: {
              url: '/',
              dataProvider: async (req) => {
                await updateCaseTree('edit', req.data)
                return {
                  data: {},
                }
              },
            },
            deleteApi: {
              url: '/',
              data: { value: '${value}', caseId: '${caseId}' },
              dataProvider: async (req) => {
                await updateCaseTree('delete', req.data)
                return {
                  data: {},
                }
              },
            },
            onEvent: {
              change: {
                actions: [getVersionUpdateAction({ changeByCaseId: true })],
              },
              deleteConfirm: {
                expression: '${event.data.value === event.data.caseId}',
                actions: [
                  {
                    actionType: 'reset',
                    componentId: 'newVersionForm',
                  },
                ],
              },
            },
          },
          {
            type: 'input-group',
            label: '版本',
            required: true,
            body: [
              {
                type: 'select',
                name: 'caseVersion',
                required: true,
                source: '${caseVersionOptions}',
                autoFill: {
                  versionDsc: '${desc}',
                },
              },
              {
                type: 'input-text',
                name: 'versionDsc',
                required: true,
                clearable: true,
                placeholder: '请输入版本描述',
              },
            ],
          },
        ],
      },
    ],
  }

  return dialogConfig
}

registerFilter('app_disabledCaseRemove', (data) => {
  const { caseId, caseVersion } = data

  // 官方定义的示例必须保留1个v1不能被删（用于回退为官方示例）
  const officialCheck = caseType.officialPristine(caseId, caseVersion)
  // 分享的内容可以被被全部删除
  const disableRemove = caseType.formShare(caseId) ? false : officialCheck

  return !caseVersion || disableRemove
})

export const SelectCase = () => {
  const { appSetting, setFiles, setAppSetting, filesHash } = useContext(PlaygroundContext)

  const storeRef = useRef<{
    scopeRef: any
    pristineFilesHash: string
    appSetting: any
  }>({
    scopeRef: null,
    pristineFilesHash: '',
    appSetting: {},
  })

  storeRef.current.appSetting = appSetting

  const caseEnable = appSetting.caseId && appSetting.caseVersion

  const setAmisValue = (componentId, value) => {
    storeRef.current.scopeRef.doAction([
      {
        actionType: 'setValue',
        componentId,
        args: {
          value,
        },
      },
    ])
  }

  const amisData = Object.assign(
    {
      caseEnable,
      resetDisable: storeRef.current.pristineFilesHash === filesHash,
    },
    appSetting.initial
      ? {
          caseId: appSetting.caseId,
          caseVersion: appSetting.caseVersion,
        }
      : {}
  )

  return (
    <>
      {renderAmis(
        {
          type: 'form',
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
              source: {
                url: '/?caseId=${caseId}',
                dataProvider: async () => {
                  return {
                    data: await getCasesTree({
                      disableOnFiles: true,
                    }),
                  }
                },
              },
              onEvent: {
                change: {
                  expression: '${event.data.__changeReason.type === "input"}',
                  actions: [
                    {
                      actionType: 'reload',
                      componentId: 'casePicker_caseVersion',
                      data: {
                        caseVersion: '',
                      },
                    },
                  ],
                },
              },
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
              source: {
                url: '/?caseId=${caseId}&caseVersion=${caseVersion}',
                dataProvider: async (req) => {
                  const { caseId, caseVersion } = req.query
                  const versions = await getCaseVersions(caseId)
                  const options = versions.map((item) => ({
                    label: `V${item.value}: ${item.label}`,
                    value: item.value,
                    count: versions.length,
                  }))
                  const newData = {
                    options,
                  }
                  if (!caseVersion) {
                    newData.value = get(options, '0.value')
                  }
                  return {
                    data: {
                      data: newData,
                    },
                  }
                },
              },
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
                  dialog: getNewVersionDialog({
                    filesHash,
                    setCurrVerPristine: async (
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
                      setAmisValue('casePickerForm', {
                        resetDisableByNew: true,
                      })
                    },
                  }),
                  level: 'primary',
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
                          script: async (context, doAction, event) => {
                            const { caseId, caseVersion } = event.data
                            const { pristineFiles } = await getCaseFiles({
                              caseId,
                              caseVersion,
                              pristine: true,
                            })
                            setFiles(pristineFiles)
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
                  confirmText:
                    '删除该版本，会同时删除该版本对应的代码。如果该示例只有一个版本，会同时删除示例。',
                  actionType: 'ajax',
                  api: {
                    url: '/',
                    dataProvider: async (req) => {
                      const { caseId, caseVersion, versionCount } = req.data
                      const onlyVersion = versionCount <= 1
                      const newData = {}

                      if (onlyVersion) {
                        if (caseType.formUserCreated(caseId)) {
                          await updateCaseTree('delete', { value: caseId })
                        } else {
                          await delCaseVersion(caseId, caseVersion)
                        }
                        const caseTree = await getCasesTree()
                        const treeNode = findTree(caseTree, (item) => !item.disabled)
                        if (treeNode) {
                          newData.caseId = treeNode.value
                        }
                      } else {
                        await delCaseVersion(caseId, caseVersion)
                        const versions = await getCaseVersions(caseId)
                        const newCaseVersion = get(versions, `0.value`)
                        if (newCaseVersion) {
                          newData.caseVersion = newCaseVersion
                        }
                      }

                      return {
                        data: {
                          data: newData,
                        },
                      }
                    },
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
                  script: async (contenxt, doAction, event) => {
                    const { initial, activeFileTab } = storeRef.current.appSetting
                    setAmisValue('casePickerForm', {
                      resetDisableByNew: false,
                    })
                    if (!initial) {
                      return
                    }

                    const { caseId, caseVersion } = event.data
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
                        document.querySelector<HTMLSpanElement>(
                          '.casePicker_caseId .cxd-ResultBox-singleValue'
                        )?.innerText || '示例'
                      } @ ${
                        document.querySelector<HTMLSpanElement>(
                          '.casePicker_caseVersion .cxd-Select-value'
                        )?.innerText || 'V1'
                      }`,
                      activeFileTab: fileName ? activeFileTab : Object.keys(files)[0],
                    })

                    storeRef.current.pristineFilesHash = pristineFilesHash
                    setFiles(files)
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
