import { findTree, mapTree, registerFilter } from 'amis-core'
import { get } from 'lodash'
import { useContext, useEffect, useRef } from 'react'

import { getCaseFiles, setCaseFiles } from '../utils'

import {
  delCaseVersion,
  getCasesTree,
  getCaseVersions,
  isUserCreatedCase,
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
      const { caseId, caseVersion } = event.data

      if (!caseId) {
        return
      }

      const versions = await getCaseVersions(caseId)
      const maxVersion = Math.max(...versions.map((item) => item.value))
      const options = versions
        .concat(
          // 分享不允许 增加版本
          caseId === 'myShare'
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
            label: `V${item.value}`,
            desc: item.desc || item.label,
          }
        })

      const defaultVer = get(versions, `0.value`) || ''
      const newValue = {
        caseVersion: changeByCaseId ? defaultVer : caseVersion || defaultVer,
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
    body: {
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
          const { pristineFilesHash } = await setCaseFiles(
            caseId,
            caseVersion,
            filesHash,
            true,
            true
          )
          const resData = await setCurrVerPristine(caseId, caseVersion, pristineFilesHash)

          return {
            data: {
              data: resData,
            },
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
          label: '示例',
          searchable: true,
          placeholder: '请选择示例',
          className: 'mr-0',
          onlyLeaf: true,
          enableDefaultIcon: false,
          deleteConfirmText: '删除该示例，将会同时删除该示例各个版本所保存的代码。请谨慎删除！',
          source: {
            url: '/',
            dataProvider: async () => {
              const caseTree = await getCasesTree()
              const options = mapTree(caseTree, (item) => {
                const userCreated = isUserCreatedCase(item.value)
                return {
                  ...item,
                  // hidden: item.value === 'myShare',
                  disabled: item.value === 'myCase' ? false : item.disabled,
                  creatable: userCreated || item.value.startsWith('my'),
                  editable: userCreated || item.value === 'myCustomBase',
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
  }

  return dialogConfig
}

registerFilter('app_disabledCaseRemove', (data) => {
  const { caseId, versionCount, caseVersion } = data

  // 官方定义的示例，必须保留1个，并且v1不能被删（用于回退为官方示例）
  const officialCheck = !isUserCreatedCase(caseId) && (versionCount <= 1 || caseVersion === 1)
  // 分享的内容可以被被全部删除
  const disableRemove = caseId === 'myShare' ? false : officialCheck

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

  const initCases = async () => {
    const { caseId, caseVersion, initial } = appSetting
    if (!initial) {
      return
    }
    setAmisValue('casePickerForm', {
      caseId,
      caseVersion,
    })
  }

  useEffect(() => {
    initCases()
  }, [appSetting.initial])

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
              clearable: true,
              label: false,
              searchable: true,
              placeholder: '请选择示例',
              className: 'mr-0',
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
                  dialog: getNewVersionDialog({
                    filesHash,
                    setCurrVerPristine: async (nextCaseId, nextVersion, pristineHash) => {
                      const { caseId, caseVersion } = appSetting
                      if (caseId === nextCaseId && caseVersion === nextVersion) {
                        storeRef.current.pristineFilesHash = pristineHash
                      } else {
                        const { pristineFilesHash } = await getCaseFiles(caseId, caseVersion, true)
                        await setCaseFiles(caseId, caseVersion, pristineFilesHash)
                      }
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
                  disabledOn: '${!caseId || !caseVersion || resetDisable || resetDisableByNew}',
                  tooltip: '清除当前版本改动',
                  onEvent: {
                    click: {
                      actions: [
                        {
                          actionType: 'custom',
                          script: async (context, doAction, event) => {
                            const { caseId, caseVersion } = event.data
                            const { pristineFiles } = await getCaseFiles(caseId, caseVersion, true)
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
                  confirmText:
                    '删除该版本，会同时删除该版本对应的代码。如果只有一个版本，会同时删除示例。请谨慎操作！',
                  actionType: 'ajax',
                  api: {
                    url: '/',
                    dataProvider: async (req) => {
                      const { caseId, caseVersion, versionCount } = req.data
                      const onlyVersion = versionCount <= 1
                      const newData = {}

                      if (onlyVersion) {
                        if (isUserCreatedCase(caseId)) {
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
                    const { files = {} } = await getCaseFiles(caseId, caseVersion)
                    const { pristineFilesHash = '' } = await setCaseFiles(
                      caseId,
                      caseVersion,
                      files,
                      true
                    )

                    const fileName = files[activeFileTab]
                    await setAppSetting({
                      caseId,
                      caseVersion,
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
          data: {
            caseEnable,
            resetDisable: !filesHash || storeRef.current.pristineFilesHash === filesHash,
          },
          scopeRef: (ref: any) => {
            storeRef.current.scopeRef = ref
          },
        }
      )}
    </>
  )
}
