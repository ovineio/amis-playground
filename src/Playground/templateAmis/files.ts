import AppCss from './src/App.css?raw'
import App from './src/App.tsx?raw'
import main from './src/main.tsx?raw'
import amisJson from './src/amisJson.ts?raw'
import env from './src/env.ts?raw'
import mock from './src/mock.ts?raw'
import { getFilesFromUrl, fileName2Language } from '../utils'

import type { IFiles } from '../types'

// app文件名
export const MAIN_FILE_NAME = 'App.tsx'
// esm模块映射文件名
export const IMPORT_MAP_FILE_NAME = 'import-map.json'
// app入口文件名
export const ENTRY_FILE_NAME = 'main.tsx'

export const initFiles: IFiles = getFilesFromUrl() || {
  [MAIN_FILE_NAME]: {
    name: MAIN_FILE_NAME,
    language: fileName2Language(MAIN_FILE_NAME),
    value: App,
  },
  [ENTRY_FILE_NAME]: {
    name: ENTRY_FILE_NAME,
    language: fileName2Language(ENTRY_FILE_NAME),
    value: main,
  },
  'amisJson.ts':{
    name: "amisJson.ts",
    language: 'typescript',
    value: amisJson,
  },
  'mock.ts': {
    name: "mock.ts",
    language: 'typescript',
    value: mock,
  },
  'App.css': {
    name: 'App.css',
    language: 'css',
    value: AppCss,
  },
  'env.ts': {
    name: "env.ts",
    language: 'typescript',
    value: env,
  },
}

export const reactTemplateFiles = {
  [ENTRY_FILE_NAME]: {
    name: ENTRY_FILE_NAME,
    language: fileName2Language(ENTRY_FILE_NAME),
    value: main,
  },
}
