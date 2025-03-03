// import { mapTree } from 'amis-core'

export type CaseTreeSchema = {
  label: string
  value: string
  version?: string
  disabled?: boolean
  children?: CaseTreeSchema[]
}

export const defCaseId = {
  myShare: 'myShare',
  myCase: 'myCase',
  myCustomBase: 'myCustomBase',
}

export const defaultCaseTree: CaseTreeSchema[] = [
  {
    label: 'amis示例',
    value: 'amisCase',
    version: 2,
    disabled: true,
    children: [
      {
        label: '基础',
        value: 'base',
        disabled: true,
        children: [
          {
            label: '最简使用',
            value: 'baseSimple',
          },
        ],
      },
    ],
  },
  {
    label: '我的示例',
    value: defCaseId.myCase,
    disabled: true,
    children: [
      {
        label: '案例1',
        value: defCaseId.myCustomBase,
      },
    ],
  },
  {
    label: '来自分享',
    value: defCaseId.myShare,
    disabled: true,
    children: [],
  },
]
