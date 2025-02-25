import { saveAs } from 'file-saver'

import AmisLogo from './icons/amis-logo.png'
import DownloadSvg from './icons/download.svg?raw'
import GithubSvg from './icons/github.svg?raw'
import MoonSvg from './icons/moon.svg?raw'
import ShareSvg from './icons/share.svg?raw'
import SuccessSvg from './icons/success.svg?raw'
import SunSvg from './icons/sun.svg?raw'

import eslintrc from '@/Playground/templateAmis/.eslintrc.cjs?raw'
import gitignore from '@/Playground/templateAmis/.gitignore?raw'
import { IMPORT_MAP_FILE_NAME } from '@/Playground/templateAmis/files'
import index from '@/Playground/templateAmis/index.html?raw'
import pkg from '@/Playground/templateAmis/package.json?raw'
import readme from '@/Playground/templateAmis/README.md?raw'
import tsconfig from '@/Playground/templateAmis/tsconfig.json?raw'
import tsconfigNode from '@/Playground/templateAmis/tsconfig.node.json?raw'
import config from '@/Playground/templateAmis/vite.config.js?raw'
import type { IFiles } from '@/Playground/types'

export const icons = {
  DownloadSvg,
  GithubSvg,
  MoonSvg,
  AmisLogo,
  ShareSvg,
  SunSvg,
  SuccessSvg,
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
