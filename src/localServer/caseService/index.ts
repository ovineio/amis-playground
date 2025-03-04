/**
 * 示例 server
 */

import { uuidv4, findTree, spliceTree, findTreeIndex, mapTree, flattenTree } from 'amis-core'
import { set, get, update, setMany, getMany, keys, del, delMany } from 'idb-keyval'
import { get as getObj } from 'lodash'

import { caseFilesMap } from './caseFiles'
import { CaseTreeSchema, defaultCaseTree, defCaseId } from './defaultCase'

type VersionSchema = {
  label: string
  value: number
  id?: string
}

type FilesSchema = string

const dbKey = {
  caseTree: 'code_case_tree',
  getCaseVersions: (caseId: string) => `case_${caseId}_versions`,
  getCaseFiles: (caseId: string, version: string | number) => `case_${caseId}_${version}_files`,
  getCasePristineFiles: (caseId: string, version: string | number) =>
    `case_${caseId}_${version}_pristineFiles`,
}

/**
 * caseTree
 */

export const caseType = {
  formShare: (id: string) => id === defCaseId.myShare,
  formMyCase: (id: string, root: boolean = true) =>
    id === (root ? defCaseId.myCase : defCaseId.myCustomBase),
  formCustom: (id: string) => id?.startsWith('my'),
  formUserCreated: (caseId: string, opts?: { withMyShare?: boolean }) => {
    const isCreated = caseId?.indexOf('-') > -1
    const isMyShare = opts?.withMyShare ? caseType.formShare(caseId) : false

    return isCreated || isMyShare
  },
  officialPristine: (caseId: string, version: string | number) => {
    const userCreated = !caseType.formUserCreated(caseId, { withMyShare: true })
    const defVersion = `${version}` === '1'

    return userCreated && defVersion
  },
}

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

type CasesTreeOptions = {
  disableOnFiles?: boolean
}
export const getCasesTree = async (options: CasesTreeOptions = {}): Promise<CaseTreeSchema[]> => {
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
      const isCheckKeys = caseType.formUserCreated(item.value, { withMyShare: true })
      if (isCheckKeys) {
        item.disabled = !allKeyMap[dbKey.getCaseVersions(item.value)]
      }
    })
  }

  return caseTree
}

export const updateCaseTree = async (type: 'addChild' | 'delete' | 'edit', data?: any) => {
  let delCaseIdPool: string[] = []

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
      const idx = findTreeIndex(savedTree, (item) => {
        const isMatch = item.value === data.value
        if (isMatch) {
          delCaseIdPool = flattenTree([item]).map((item) => item.value)
        }
        return isMatch
      })

      newTree = spliceTree(savedTree, idx, 1)
    } else if (type === 'edit') {
      const idx = findTreeIndex(savedTree, (item) => item.value === data.value)
      newTree = spliceTree(savedTree, idx, 1, data)
    }

    return newTree
  })

  if (delCaseIdPool.length) {
    await Promise.all(delCaseIdPool.map((id) => delCaseVersions(id)))
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
export const getCaseFiles = async (
  caseId: string,
  version: string | number,
  pristine: boolean = false
) => {
  const keys = pristine
    ? [dbKey.getCaseFiles(caseId, version), dbKey.getCasePristineFiles(caseId, version)]
    : [dbKey.getCaseFiles(caseId, version)]

  const [filesHash, pristineFilesHash] = await getMany(keys)
  const result = {
    filesHash: filesHash || '',
    pristineFilesHash: pristineFilesHash || '',
    officialPristine: caseType.officialPristine(caseId, version) ? caseFilesMap[caseId] : {},
  }

  return result
}

export const isCaseHasFiles = async (caseId: string, version: string) => {
  const result = await get(dbKey.getCaseFiles(caseId, version))
  return !!result
}

// 设置文件
type SetCaseFilesOptions = {
  caseId: string
  caseVersion: number
  versionLabel?: string
  filesHash: FilesSchema
  pristine?: boolean
  onlyPristine?: boolean
  overwritePristine?: boolean
}
export const setCaseFiles = async (options: SetCaseFilesOptions) => {
  const {
    caseId,
    caseVersion,
    filesHash,
    versionLabel,
    pristine = false,
    onlyPristine = false,
    overwritePristine = false,
  } = options

  if (!caseId || !caseVersion || !filesHash) {
    return
  }

  const setKeys =
    pristine && onlyPristine ? [] : [[dbKey.getCaseFiles(caseId, caseVersion), filesHash]]

  let pristineFilesHash = ''
  // 官方 pristine 不需要保存
  if (pristine && !caseType.officialPristine(caseId, caseVersion)) {
    const pristineKey = dbKey.getCasePristineFiles(caseId, caseVersion)
    pristineFilesHash = await get(pristineKey)
    // 不存在 pristine 或者，强制覆盖 pristine。才更新 pristine
    if (!pristineFilesHash || overwritePristine) {
      pristineFilesHash = filesHash
      setKeys.push([pristineKey, filesHash])
    }
  }

  await setMany(setKeys)

  if (versionLabel) {
    await updateVersionLabel(caseId, caseVersion, versionLabel)
  }

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
export const getCaseVersions = async (caseId: string): Promise<VersionSchema[]> => {
  if (!caseId) {
    return []
  }

  let versions = await get(dbKey.getCaseVersions(caseId))
  if (!versions || !Array.isArray(versions)) {
    versions = [
      {
        value: 1,
        label: '默认',
      },
    ]
  }
  return versions
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

// 设置全量版本
export const setCaseVersions = async (caseId: string, versions: VersionSchema[]) => {
  if (!caseId || !Array.isArray(versions)) {
    return
  }
  await set(dbKey.getCaseVersions(caseId), versions)
}

// 设置某个版本的label
export const updateVersionLabel = async (caseId: string, version: number, label: string) => {
  if (!caseId || !version || !label) {
    return
  }

  await update(dbKey.getCaseVersions(caseId), (versions = []) => {
    const versionItem = versions.find((item) => item.value === version)

    if (versionItem) {
      versionItem.label = label
    }

    return versions
  })
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
export const addNewVersion = async (caseId: string, label: string, id: string = '') => {
  if (!caseId) {
    return -1
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
        id, // 目前仅仅是share的时候，标记了版本ID
      },
    ])

    return newVersions
  })

  return newVersion
}

// 某个versionId 下的版本文件变化情况
export const checkFilesChangeByVerId = async (
  files: FilesSchema,
  caseId: string,
  versionId: string
): Promise<{
  paramsError?: boolean
  versionNotFound?: boolean
  filesChanged?: boolean
  version?: number
}> => {
  if (!files || !caseId || !versionId) {
    return {
      paramsError: true,
    }
  }

  const versions = await getCaseVersions(caseId)
  const versionItem = versions.find((item) => item.id === versionId)
  if (!versionItem) {
    return {
      versionNotFound: true,
    }
  }

  const versionFiles = await getCaseFiles(caseId, versionItem.value)
  const filesChanged = files !== versionFiles.filesHash

  return {
    filesChanged,
    version: versionItem.value,
  }
}
