// import { mapTree } from 'amis-core'

export const defaultCaseTree = [
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
    value: 'myCase',
    disabled: true,
    children: [
      {
        label: '案例1',
        value: 'myCustomBase',
      },
    ],
  },
]
