/**
 * TODO: 支持修改 新建示例时的 排序
 */

import { findTree, mapTree, registerFilter } from 'amis-core'
import { get } from 'lodash'

import { setAmisValue } from '../../Amis/utils'
import { setCaseFiles } from '../utils'

import styles from './index.module.less'

import {
  caseType,
  getCasesTree,
  getCaseVersions,
  isCaseHasFiles,
  setCaseVersions,
  updateCaseTree,
} from '@/localServer/caseService'

registerFilter('app_disabledCaseRemove', (data) => {
  const { caseId, caseVersion } = data

  // 官方定义的示例必须保留1个v1不能被删（用于回退为官方示例）
  const officialCheck = caseType.officialPristine(caseId, caseVersion)
  // 分享的内容可以被被全部删除
  const disableRemove = caseType.formShare(caseId) ? false : officialCheck

  return !caseVersion || disableRemove
})

export const checkCaseValid = async (caseId: string) => {
  const caseTree = await getCasesTree({
    disableOnFiles: true,
  })
  let caseItem
  let firstValidCaseItem
  findTree(caseTree, (item) => {
    if (!firstValidCaseItem && !item.disabled) {
      firstValidCaseItem = item
    }
    if (item.value === caseId) {
      caseItem = item
    }
    return false
  })

  return {
    caseTree,
    validCaseItem: caseItem || firstValidCaseItem || {},
    firstValidCaseItem,
    caseItem,
  }
}

export const getVersionUpdateAction = (options: {
  clearFormValue: () => void
  changeByCaseId?: boolean
}) => {
  const { changeByCaseId = false, clearFormValue } = options

  const actionConfig = {
    actionType: 'custom',
    script: async (_context, doAction, event) => {
      let { caseId, caseVersion } = event.data

      if (!caseId) {
        clearFormValue()
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
            id: item.id,
            value: item.value,
            label: `V${item.value}`,
            desc: item.desc || item.label,
            // 官方代码不允许覆盖
            disabled: caseType.officialPristine(caseId, item.value),
          }
        })

      let defSelectItem: any
      options.some((item) => {
        // 禁用的不能被选中
        if (item.disabled) {
          return false
        }
        // 默认: 选中最后一个可用版本（没有默认选中最新新增版本，原因：防止过度新建版本）
        if (item.desc) {
          defSelectItem = item
        }

        // 如果是首次进入场景，则选中当前选中的
        if (!changeByCaseId && item.value === caseVersion) {
          defSelectItem = item
          return true
        }

        return false
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

export const getNewVersionDialog = (options = {}) => {
  const { filesHash, setCurrVerPristine, storeRef } = options

  const clearFormValue = () => {
    setAmisValue(storeRef, 'newVersionDialog', {
      caseId: '',
      caseVersion: '',
      versionDsc: '',
      caseVersionOptions: [],
    })
  }

  const dialogConfig = {
    title: '新建示例',
    id: 'newVersionDialog',
    className: styles.newVersionDialog,
    data: {
      caseId: '${caseId}',
      caseVersion: '${caseVersion}',
      pristineData: {
        caseId: '${caseId}',
        caseVersion: '${caseVersion}',
      },
    },
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
            actions: [
              getVersionUpdateAction({
                clearFormValue,
              }),
            ],
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
                expression: '${pristineData.caseId === caseId}',
                componentId: 'casePicker_caseId',
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
                id: item.id,
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
            searchable: true,
            creatable: true,
            removable: true,
            editable: true,
            rootCreatable: false,
            label: '选择示例',
            placeholder: '请选择示例',
            className: 'newVersion_caseId mr-0',
            onlyLeaf: true,
            enableDefaultIcon: false,
            deleteConfirmText: '删除该示例，将会同时删除该示例各个版本所保存的代码。',
            desc: '可动态编辑选项，仅能选择叶子结点',
            // itemActions: [
            //   {
            //     type: 'tooltip-wrapper',
            //     content: '排序',
            //     tooltipTheme: 'dark',
            //     placement: 'bottom',
            //     body: {
            //       type: 'button',
            //       icon: 'fa fa-exchange',
            //       level: 'link',
            //       className: '-ml-2',
            //       visibleOn: '${LENGTH(children) > 1}',
            //       onEvent: {
            //         click: {
            //           actions: [
            //             {
            //               //
            //             },
            //           ],
            //         },
            //       },
            //     },
            //   },
            // ],
            source: {
              url: '/getCaseTree',
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
            addDialog: {
              title: '新增示例',
            },
            addControls: [
              {
                label: '示例名称',
                type: 'input-text',
                required: true,
                name: 'label',
                showCounter: true,
                maxLength: 12,
              },
            ],
            addApi: {
              url: '/?addCase',
              data: {
                label: '${label}',
                parent: '${parent}',
              },
              dataProvider: async (req) => {
                const { label, parent } = req.data
                await updateCaseTree('addChild', { label, parent })
                return {
                  data: {},
                }
              },
            },
            editDialog: {
              title: '编辑示例',
            },
            editControls: [
              {
                type: 'hidden',
                name: 'value',
              },
              {
                label: '示例名称',
                type: 'input-text',
                required: true,
                name: 'label',
                showCounter: true,
                maxLength: 12,
              },
            ],
            editApi: {
              url: '/',
              data: {
                value: '${value}',
                label: '${label}',
              },
              dataProvider: async (req) => {
                const { value, label } = req.data
                await updateCaseTree('edit', {
                  value,
                  label,
                })
                return {
                  data: {},
                }
              },
            },
            deleteApi: {
              url: '/delCase',
              data: {
                value: '${value}',
                caseId: '${caseId}',
              },
              dataProvider: async (req) => {
                const { value, caseId } = req.data
                await updateCaseTree('delete', { value })
                const caseTree = await getCasesTree()

                // 删除之后，选择的值不存在了，清空已选的选项
                if (caseId && !findTree(caseTree, (item) => item.value === caseId)) {
                  clearFormValue()
                }

                return {
                  data: {},
                }
              },
            },
            onEvent: {
              change: {
                actions: [getVersionUpdateAction({ changeByCaseId: true, clearFormValue })],
              },
            },
          },
          {
            type: 'input-group',
            label: '设置版本',
            required: true,
            desc: '左侧下拉框可选择版本，右侧可编写版本描述',
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
                showCounter: true,
                maxLength: 12,
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
