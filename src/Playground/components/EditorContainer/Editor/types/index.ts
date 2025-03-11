/**
 * 补充 editor ts 的类型校验
 * 临时使用该方法 暂且让TS不报“红”
 * 最好还是能够，使用一些在线的方式解决（或者能够扩展为部分为any）
 */

import { typeArray as AmisTypes } from './amis/types'
import { typeArray as AmisCoreTypes } from './amis-core/types'
import amisUiComponentsDts from './amisUi-components.txt?raw'
import amisUiDts from './amisUi.txt?raw'

const prefix = `file:///node_modules/@types/`
const affix = `/index.d.ts`

const getPath = (str: string) => `${prefix}${str}${affix}`

export const amisPkgDefineFiles = AmisTypes.concat(AmisCoreTypes).concat([
  [amisUiDts, getPath('amis-ui')],
  [amisUiComponentsDts, getPath('amis-ui/components')],
])

export const declareUsedPkgs = [
  [`declare module 'sinon'`, getPath('sinon')],
  [`declare module 'fakerest'`, getPath('fakerest')],
  [`declare module 'mockjs'`, getPath('mockjs')],
  [`declare module 'copy-to-clipboard'`, getPath('copy-to-clipboard')],
]
