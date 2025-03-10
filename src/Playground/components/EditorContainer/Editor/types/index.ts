/**
 * 补充 editor ts 的类型校验
 * 临时使用该方法 暂且让TS不报“红”
 * 最好还是能够，使用一些在线的方式解决（或者能够扩展为部分为any）
 */

import amisDts from './amis.txt?raw'
import amisCoreHelperDts from './amisCore-helper.txt?raw'
import amisCoreDts from './amisCore.txt?raw'
import amisUiComponentsDts from './amisUi-components.txt?raw'
import amisUiDts from './amisUi.txt?raw'

const prefix = `file:///node_modules/@types/`
const affix = `/index.d.ts`

const getPath = (str: string) => `${prefix}${str}${affix}`

export const amisPkgDefineFiles = [
  [amisDts, getPath('amis')],
  [
    `
    ${amisCoreDts}
    export * from 'utils/helper';
    export const normalizeLink: any;
    export const attachmentAdpator: any;
    `,
    getPath('amis-core'),
  ],
  [amisCoreHelperDts, getPath('amis-core/utils/helper')],
  [amisUiDts, getPath('amis-ui')],
  [amisUiComponentsDts, getPath('amis-ui/components')],
]

export const declareUsedPkgs = [
  [` declare module 'sinon'`, getPath('sinon')],
  [`declare module 'fakerest'`, getPath('fakerest')],
  [`declare module 'mockjs'`, getPath('mockjs')],
  [`declare module 'copy-to-clipboard'`, getPath('copy-to-clipboard')],
]
