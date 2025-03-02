/**
 * 示例 server
 */

import {
  uuidv4,
  flattenTree,
  findTree,
  spliceTree,
  findIndex,
  findTreeIndex,
  mapTree,
} from 'amis-core'
import { set, get, update, setMany, getMany, keys, del, delMany } from 'idb-keyval'
import { get as getObj } from 'lodash'

import { caseFilesMap } from './caseFiles'
import { defaultCaseTree } from './defaultCase'

import { atou, hash2json, json2hash, utoa } from '@/Playground/utils'

const dbKey = {
  caseTree: 'code_case_tree',
  getCaseVersions: (caseId: string) => `case_${caseId}_versions`,
  getCaseFiles: (caseId: string, version: string | number) => `case_${caseId}_${version}_files`,
  getCasePristineFiles: (caseId: string, version: string) =>
    `case_${caseId}_${version}_pristineFiles`,
}

/**
 * caseTree
 */

export const isUserCreatedCase = (caseId: string) => caseId?.indexOf('-') > -1

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

export const getCasesTree = async (options = {}) => {
  const { disableOnFiles = false } = options
  let caseTree = await get(dbKey.caseTree)
  if (!caseTree) {
    return defaultCaseTree
  }
  if (disableOnFiles) {
    const allKeys = await keys()
    const allKeyMap: any = allKeys.reduce((map, key: string) => {
      return {
        [key]: true,
        ...map,
      }
    }, {})

    caseTree = mapTree(caseTree, (item) => {
      const isCheckKeys = isUserCreatedCase(item.value) || item.value === 'myShare'
      if (isCheckKeys) {
        item.disabled = !allKeyMap[dbKey.getCaseVersions(item.value)]
      }
    })
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
// 获取文件
export const getCaseFiles = async (caseId: string, version: string, pristine: boolean = false) => {
  const keys = pristine
    ? [dbKey.getCaseFiles(caseId, version), dbKey.getCasePristineFiles(caseId, version)]
    : [dbKey.getCaseFiles(caseId, version)]

  const [filesHash, pristineFilesHash] = await getMany(keys)
  const result = {
    files: filesHash ? hash2json(filesHash) : caseFilesMap[caseId],
    filesHash: filesHash || json2hash(caseFilesMap[caseId]),
    pristineFiles: {},
    pristineFilesHash: '',
  }
  if (pristine) {
    result.pristineFiles = pristineFilesHash ? hash2json(pristineFilesHash) : caseFilesMap[caseId]
    result.pristineFilesHash = pristineFilesHash || json2hash(caseFilesMap[caseId])
  }

  return result
}

// 设置文件
export const setCaseFiles = async (options: {
  caseId: string
  caseVersion: number
  filesHash: string
  pristine?: boolean
  overwritePristine?: boolean
}) => {
  const { caseId, caseVersion, filesHash, pristine = false, overwritePristine = false } = options
  if (!caseId || !caseVersion) {
    return
  }

  const setKeys = [[dbKey.getCaseFiles(caseId, caseVersion), filesHash]]
  let pristineFilesHash = ''
  if (pristine) {
    const pristineKey = dbKey.getCasePristineFiles(caseId, caseVersion)
    pristineFilesHash = await get(pristineKey)
    // 不存在 pristine 或者，强制覆盖 pristine。才更新 pristine
    if (!pristineFilesHash || overwritePristine) {
      pristineFilesHash = filesHash
      setKeys.push([pristineKey, filesHash])
    }
  }

  await setMany(setKeys)

  return {
    pristineFilesHash,
    filesHash,
  }
}

// 删除文件
export const delCaseFiles = async (caseId: string, version: string) => {
  if (!caseId) {
    return
  }
  await delMany([dbKey.getCaseFiles(caseId, version), dbKey.getCasePristineFiles(caseId, version)])
}

/**
 * caseVersion
 */
// 获取版本
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

// 设置版本
export const setCaseVersions = async (caseId: string, versions: any[]) => {
  if (!caseId || !Array.isArray(versions)) {
    return
  }
  await set(dbKey.getCaseVersions(caseId), versions)
}

// 删除某个版本
export const delCaseVersion = async (caseId: string, version: string) => {
  if (!caseId || !version) {
    return
  }
  // 删除版本代码
  await delCaseFiles(caseId, version)
  const savedVersions = await get(dbKey.getCaseVersions(caseId))
  // 删除对应的版本
  const newVersions = (savedVersions || []).filter((item) => item.value !== version)

  if (newVersions.length) {
    await set(dbKey.getCaseVersions(caseId), newVersions)
  } else {
    await del(dbKey.getCaseVersions(caseId))
  }

  return newVersions
}

// 添加新版本
export const addNewVersion = async (caseId: string, label: string) => {
  if (!caseId) {
    return
  }

  let newVersion = 1
  await update(dbKey.getCaseVersions(caseId), (savedVersions = []) => {
    const maxVersion = !savedVersions.length
      ? 0
      : Math.max(...savedVersions.map((item) => item.value))
    newVersion = (maxVersion || 0) + 1
    const newVersions = savedVersions.concat([
      {
        value: newVersion,
        label,
      },
    ])

    return newVersions
  })

  return newVersion
}

// 删除 case 对应版本所有内容
export const delCaseVersions = async (caseId: string) => {
  if (!caseId) {
    return
  }
  const versions = await getCaseVersions(caseId)
  if (!Array.isArray(versions)) {
    return
  }
  // 删除所有文件
  const fileKeys = versions.flatMap((item) => [
    dbKey.getCaseFiles(caseId, item.value),
    dbKey.getCasePristineFiles(caseId, item.value),
  ])
  // 删除版本
  const allKeys = [...fileKeys, dbKey.getCaseVersions(caseId)]

  await delMany(allKeys)
}
