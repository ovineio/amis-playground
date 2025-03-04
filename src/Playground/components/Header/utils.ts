import { saveAs } from 'file-saver'
import { isPlainObject } from 'lodash'

import AmisLogo from './icons/amis-logo.png'
import DownloadSvg from './icons/download.svg?raw'
import GithubSvg from './icons/github.svg?raw'
import MoonSvg from './icons/moon.svg?raw'
import ShareSvg from './icons/share.svg?raw'
import SuccessSvg from './icons/success.svg?raw'
import SunSvg from './icons/sun.svg?raw'

import * as caseService from '@/localServer/caseService'
import eslintrc from '@/Playground/templateAmis/.eslintrc.cjs?raw'
import gitignore from '@/Playground/templateAmis/.gitignore?raw'
import { IMPORT_MAP_FILE_NAME, initFiles } from '@/Playground/templateAmis/files'
import index from '@/Playground/templateAmis/index.html?raw'
import pkg from '@/Playground/templateAmis/package.json?raw'
import readme from '@/Playground/templateAmis/README.md?raw'
import tsconfig from '@/Playground/templateAmis/tsconfig.json?raw'
import tsconfigNode from '@/Playground/templateAmis/tsconfig.node.json?raw'
import config from '@/Playground/templateAmis/vite.config.js?raw'
import type { IFiles } from '@/Playground/types'
import { hash2json, json2hash } from '@/Playground/utils'

export const icons = {
  DownloadSvg,
  GithubSvg,
  MoonSvg,
  AmisLogo,
  ShareSvg,
  SunSvg,
  SuccessSvg,
}

const getFilesMap = (files: any) => {
  const filesMap = {}
  Object.entries(files).forEach(([key, value]) => {
    filesMap[key] = value
    if (value === true) {
      filesMap[key] = initFiles[key]
    }
  })
  return filesMap
}

const cacheOfficePristine: {
  [key: string]: {
    filesHash: string
  }
} = {}

type CaseFilesInfo = {
  files: any
  filesHash: string
  pristineFiles: any
  pristineFilesHash: string
}
type CaseFilesOptions = {
  caseId: string
  caseVersion: number
  pristine?: boolean
  withHash?: boolean
  withJson?: boolean
}
export const getCaseFiles = async (options: CaseFilesOptions): Promise<CaseFilesInfo> => {
  const { caseId, caseVersion, pristine = false, withHash = false, withJson = true } = options
  let caseFilesInfo = {
    files: {},
    filesHash: '',
    pristineFiles: {},
    pristineFilesHash: '',
  }

  if (!caseId || !caseVersion) {
    return caseFilesInfo
  }

  const { filesHash, pristineFilesHash, officialPristine } = await caseService.getCaseFiles(
    caseId,
    caseVersion,
    pristine
  )

  // 没找到文件
  if (!filesHash && !officialPristine) {
    const files = initFiles
    const filesHash = withHash ? json2hash(initFiles) : ''
    caseFilesInfo = {
      files,
      filesHash,
      pristineFiles: files,
      pristineFilesHash: filesHash,
    }
    return caseFilesInfo
  }

  // 未找到 存储的hash，则使用 官方提供的代码
  if (!filesHash && officialPristine) {
    const files = getFilesMap(officialPristine)
    const filesHash = withHash ? json2hash(files) : ''
    caseFilesInfo = {
      files,
      filesHash,
      pristineFiles: files,
      pristineFilesHash: filesHash,
    }

    return caseFilesInfo
  }

  // 找到存储的内容 直接进行转换
  if (filesHash) {
    const files = withJson ? hash2json(filesHash) : {}
    caseFilesInfo.files = files
    caseFilesInfo.filesHash = filesHash
  }

  if (pristine) {
    // 官方 pristine 不用存储，每次都是实时转
    if (officialPristine && caseService.caseType.officialPristine(caseId, caseVersion)) {
      const cacheKey = `${caseId}_${caseVersion}`
      const cacheInfo = cacheOfficePristine[cacheKey]
      const files = getFilesMap(officialPristine)
      const filesHash = cacheInfo?.filesHash || json2hash(files)
      // 未缓存则进行缓存，下次可直接使用
      if (!cacheInfo) {
        cacheOfficePristine[cacheKey] = {
          filesHash,
        }
      }
      caseFilesInfo.pristineFiles = files
      caseFilesInfo.pristineFilesHash = filesHash
    } else if (pristineFilesHash) {
      caseFilesInfo.pristineFiles = withJson ? hash2json(pristineFilesHash) : {}
      caseFilesInfo.pristineFilesHash = pristineFilesHash
    }
  }

  return caseFilesInfo
}

const defaultHash = json2hash({})
export const setCaseFiles = async (
  options: CaseFilesOptions & {
    versionLabel?: string
    filesHash?: string
    onlyPristine?: boolean
    overwritePristine?: boolean
    returnCaseInfo?: boolean
  }
): Promise<Partial<CaseFilesInfo>> => {
  const {
    caseId,
    caseVersion,
    filesHash = '',
    versionLabel,
    pristine = false,
    onlyPristine = false,
    overwritePristine = false,
    returnCaseInfo,
    withHash,
    withJson,
  } = options

  if (!caseId || !caseVersion) {
    return {}
  }

  if (filesHash && filesHash !== defaultHash) {
    await caseService.setCaseFiles({
      caseId,
      caseVersion,
      versionLabel,
      filesHash,
      pristine,
      onlyPristine,
      overwritePristine,
    })
  }

  let caseInfo = {}
  if (returnCaseInfo) {
    caseInfo = await getCaseFiles({
      caseId,
      caseVersion,
      pristine,
      withHash,
      withJson,
    })
  }
  return caseInfo
}

export const setCaseFiles2Pristine = async (options: CaseFilesOptions) => {
  const { caseId, caseVersion } = options
  const { pristineFilesHash = '' } = await getCaseFiles({
    caseId,
    caseVersion,
    pristine: true,
    withHash: true,
    withJson: false,
  })
  await setCaseFiles({
    caseId,
    caseVersion,
    filesHash: pristineFilesHash,
  })
}

export async function downloadFiles(files: IFiles) {
  // @ts-ignore
  const { default: JSZip } = await import('https://esm.sh/jszip@3.10.1')
  const zip = new JSZip()

  // basic structure
  zip.file('index.html', index)
  zip.file('package.json', pkg)
  zip.file('vite.config.js', config)
  zip.file('tsconfig.json', tsconfig)
  zip.file('tsconfig.node.json', tsconfigNode)
  zip.file('README.md', readme)
  zip.file('eslintrc.md', eslintrc)
  zip.file('gitignore.md', gitignore)

  // project src
  const src = zip.folder('src')!

  Object.keys(files).forEach((name) => {
    if (files[name].name !== IMPORT_MAP_FILE_NAME) {
      src.file(name, files[name].value)
    } else {
      zip.file(name, files[name].value)
    }
  })

  const blob = await zip.generateAsync({ type: 'blob' })
  saveAs(blob, 'react-project.zip')
}
