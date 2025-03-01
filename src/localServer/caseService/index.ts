/**
 * 示例 server
 */

import { uuidv4, flattenTree, findTree, spliceTree, findIndex, findTreeIndex } from 'amis-core'
import { set, get, update, setMany, getMany, del, delMany } from 'idb-keyval'
import { get as getObj } from 'lodash'

import { caseFilesMap } from './caseFiles'
import { defaultCaseTree } from './defaultCase'

import { atou } from '@/Playground/utils'

const dbKey = {
  caseTree: 'code_case_tree',
  getCaseVersions: (caseId: string) => `case_${caseId}_versions`,
  getCaseFiles: (caseId: string, version: string) => `case_${caseId}_${version}_files`,
}

/**
 * caseTree
 */
export const initCaseTree = async () => {
  const savedTree = await get(dbKey.caseTree)

  let newTree
  if (!savedTree) {
    newTree = defaultCaseTree
  } else if (getObj(savedTree, `0.version`) !== getObj(defaultCaseTree, `0.version`)) {
    newTree = [defaultCaseTree[0]].concat(savedTree.slice(1))
  }

  if (newTree) {
    await set(dbKey.caseTree, newTree)
  }
}

export const getCasesTree = async () => {
  const caseTree = await get(dbKey.caseTree)
  if (!caseTree) {
    return defaultCaseTree
  }
  return caseTree
}

export const updateCaseTree = async (type: 'addChild' | 'delete' | 'edit', data?: any) => {
  await update(dbKey.caseTree, (savedTree) => {
    let newTree = savedTree
    if (type === 'addChild') {
      const { label, parent } = data || {}
      const parentCase = findTree(savedTree, (item) => item.value === parent.value)
      if (parentCase) {
        const newChildren = [
          {
            value: uuidv4(),
            label,
          },
        ].concat(parentCase.children || [])
        parentCase.children = newChildren
      }
    } else if (type === 'delete') {
      const idx = findTreeIndex(savedTree, (item) => item.value === data.value)
      newTree = spliceTree(savedTree, idx, 1)
    } else if (type === 'edit') {
      const idx = findTreeIndex(savedTree, (item) => item.value === data.value)
      newTree = spliceTree(savedTree, idx, 1, data)
    }

    return newTree
  })

  if (type === 'delete') {
    await delCaseVersions(data.value)
  }
}

export const setCaseTree = async (tree: any) => {
  const caseTree = await set(dbKey.caseTree, tree)
  return caseTree
}

/**
 * caseFiles
 */
export const getCaseFiles = async (caseId: string, version: string) => {
  const filesHash = await get(dbKey.getCaseFiles(caseId, version))
  const filesMap = filesHash ? JSON.parse(atou(filesHash)) : caseFilesMap[caseId]
  return filesMap
}

export const delCaseFiles = async (caseId: string, version: string) => {
  if (!caseId) {
    return
  }
  await del(dbKey.getCaseFiles(caseId, version))
}

/**
 * caseVersion
 */
export const getCaseVersions = async (caseId: string) => {
  if (!caseId) {
    return []
  }

  let versions = await get(dbKey.getCaseVersions(caseId))
  if (!versions) {
    versions = [
      {
        value: 1,
        label: '默认',
      },
    ]
    await set(dbKey.getCaseVersions(caseId), versions)
  }
  return versions
}

export const setCaseVersions = async (caseId: string, versions: any[]) => {
  if (!caseId || !Array.isArray(versions)) {
    return
  }
  await set(dbKey.getCaseVersions(caseId), versions)
}

export const delCaseVersion = async (caseId: string, version: string) => {
  if (!caseId || !version) {
    return
  }
  // 删除版本代码
  await del(dbKey.getCaseFiles(caseId, version))
  // 删除对应的版本
  await update(dbKey.getCaseVersions(caseId), (savedVersions = []) => {
    const newVersions = savedVersions.filter((item) => item.value !== version)
    return newVersions
  })
}

export const delCaseVersions = async (caseId: string) => {
  if (!caseId) {
    return
  }
  const versions = await getCaseVersions(caseId)
  if (!Array.isArray(versions)) {
    return
  }
  // 删除所有文件
  const fileKeys = versions.map((item) => dbKey.getCaseFiles(caseId, item.value))
  // 删除版本
  const allKeys = fileKeys.concat([dbKey.getCaseVersions(caseId)])
  await delMany(allKeys)
}
