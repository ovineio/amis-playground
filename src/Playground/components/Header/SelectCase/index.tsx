import { findTree, mapTree, registerFilter, uuidv4 } from 'amis-core'
import { get } from 'lodash'
import { useEffect } from 'react'

import { caseOptions } from './caseOptions'

import {
  delCaseVersion,
  getCasesTree,
  getCaseVersions,
  initCaseTree,
  setCaseVersions,
  updateCaseTree,
} from '@/localServer/caseService'
import { renderAmis } from '@/Playground/components/Amis'

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
        .concat([
          {
            value: maxVersion + 1,
            desc: '',
          },
        ])
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

const newVersionDialog = {
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
              return {
                ...item,
                disabled: item.value === 'myCase' ? false : item.disabled,
                creatable: /(-|my)/.test(item.value),
                editable: /(-|myCustomBase)/.test(item.value),
                removable: /-/.test(item.value),
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

const delVersionDialog = {
  title: '删除示例',
  body: {
    type: 'form',
    body: [
      {
        type: 'tree-select',
        name: 'tree',
        creatable: true,
        removable: true,
        editable: true,
        rootCreatable: false,
        label: '示例',
        searchable: true,
        clearable: false,
        placeholder: '请选择示例',
        className: 'mr-0',
        onlyLeaf: true,
        enableDefaultIcon: false,
        options: caseOptions,
      },
      {
        type: 'select',
        label: '版本',
        name: 'version',
        editable: true,
        options: [{ label: 'v1', value: 'v1' }],
      },
    ],
  },
}

registerFilter('canDisableVersion', (data) => {
  console.log('-->data', data)
  return false
})

const hasHash = location.hash
export const SelectCase = () => {
  useEffect(() => {
    initCaseTree()
  }, [])

  return (
    <>
      {renderAmis({
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
            selectFirst: !hasHash,
            source: {
              url: '/?caseId=${caseId}',
              dataProvider: async () => {
                return {
                  data: await getCasesTree(),
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
                      caseVersion: ''
                    }
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
            clearable: true,
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
                tooltip: '新建示例',
                actionType: 'dialog',
                dialog: newVersionDialog,
                level: 'primary',
              },
              {
                type: 'button',
                label: '重置',
                disabled: true,
                tooltip: '清除当前版本改动',
              },
              {
                type: 'button',
                label: '删除',
                tooltip: '删除该版本示例',
                disabledOn: '${!caseVersion || (SEARCH(caseId, "-") === -1  && (versionCount <= 1 || caseVersion === 1))}',
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
                      await updateCaseTree('delete', { value: caseId })
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
      })}
    </>
  )
}
