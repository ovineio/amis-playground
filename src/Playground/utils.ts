import { strFromU8, strToU8, unzlibSync, zlibSync } from 'fflate'

import { IMPORT_MAP_FILE_NAME, reactTemplateFiles, initFiles } from './templateAmis/files'
import { ICustomFiles, IImportMap, ITheme } from './types'
import * as caseService from '../localServer/caseService'

import type { IFiles } from './types'

export function debounce(fn: (...args: any[]) => void, n = 100) {
  let handle: any
  return (...args: any[]) => {
    if (handle) clearTimeout(handle)
    handle = setTimeout(() => {
      fn(...args)
    }, n)
  }
}

// 编码
export function utoa(data: string): string {
  const buffer = strToU8(data)
  const zipped = zlibSync(buffer, { level: 9 })
  const binary = strFromU8(zipped, true)
  return btoa(binary)
}

// 解码
export function atou(base64: string): string {
  const binary = atob(base64)

  // zlib header (x78), level 9 (xDA)
  if (binary.startsWith('\x78\xDA')) {
    const buffer = strToU8(binary, true)
    const unzipped = unzlibSync(buffer)
    return strFromU8(unzipped)
  }

  // old unicode hacks for backward compatibility
  // https://base64.guru/developers/javascript/examples/unicode-strings
  return decodeURIComponent(escape(binary))
}

export function json2hash(json: any): string {
  return utoa(JSON.stringify(json))
}

export function hash2json(hash: string): any {
  return JSON.parse(atou(hash))
}

const STORAGE_DARK_THEME = 'react-playground-prefer-dark'

export const setPlaygroundTheme = (theme: ITheme) => {
  localStorage.setItem(STORAGE_DARK_THEME, String(theme === 'dark'))
  document
    .querySelectorAll('div[data-id="react-playground"]')
    ?.forEach((item) => item.setAttribute('class', theme))
}

export const getPlaygroundTheme = () => {
  const isDarkTheme = JSON.parse(localStorage.getItem(STORAGE_DARK_THEME) || 'false')
  return isDarkTheme ? 'dark' : 'light'
}

const transformCustomFiles = (files: ICustomFiles) => {
  const newFiles: IFiles = {}
  Object.keys(files).forEach((key) => {
    const tempFile = files[key]
    if (typeof tempFile === 'string') {
      newFiles[key] = {
        name: key,
        language: fileName2Language(key),
        value: tempFile,
      }
    } else {
      newFiles[key] = {
        name: key,
        language: fileName2Language(key),
        value: tempFile.code,
        hidden: tempFile.hidden,
        active: tempFile.active,
      }
    }
  })

  return newFiles
}

// 获取用户自定义的选中文件
export const getCustomActiveFile = (files?: ICustomFiles) => {
  if (!files) return null
  return Object.keys(files).find((key) => {
    const tempFile = files[key]
    if (typeof tempFile !== 'string' && tempFile.active) {
      return key
    }
    return null
  })
}

// 合并用户自定义files和importMap，files需要转换
export const getMergedCustomFiles = (files?: ICustomFiles, importMap?: IImportMap) => {
  if (!files) return null
  if (importMap) {
    return {
      ...reactTemplateFiles,
      ...transformCustomFiles(files),
      [IMPORT_MAP_FILE_NAME]: {
        name: IMPORT_MAP_FILE_NAME,
        language: 'json',
        value: JSON.stringify(importMap, null, 2),
      },
    }
  } else {
    return {
      ...reactTemplateFiles,
      ...transformCustomFiles(files),
    }
  }
}

// 从url query 中获取files
export const getFilesHashFromUrl = () => {
  let filesHash: string | undefined
  try {
    if (typeof window !== 'undefined') {
      const query = new URLSearchParams(location.search)
      filesHash = decodeURIComponent(query.get('share') || '')
    }
  } catch (error) {
    console.error(error)
  }
  return filesHash
}

// 根据文件名后缀匹配文件类型
export const fileName2Language = (name: string) => {
  const suffix = name.split('.').pop() || ''
  if (['js', 'jsx'].includes(suffix)) return 'javascript'
  if (['ts', 'tsx'].includes(suffix)) return 'typescript'
  if (['json'].includes(suffix)) return 'json'
  if (['css'].includes(suffix)) return 'css'
  return 'javascript'
}
