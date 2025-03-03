/*
 * 希望后期支持动态获取case
 */
import { mapTree } from 'amis-core'

const amisCase = () => {
  const caseConfig = {
    label: 'amis示例',
    children: [
      {
        label: '基础',
        children: [
          {
            label: '最简使用',
            value: 'a',
          },
        ],
      },
      {
        label: '事件与动作',
        children: [
          {
            label: '最简使用',
            value: 'c1',
          },
        ],
      },
      {
        label: '各类联动',
        children: [
          {
            label: '最简使用',
            value: 'c3',
          },
        ],
      },
      {
        label: '自定义扩展',
        children: [
          {
            label: '最简使用',
            value: 'b2',
          },
        ],
      },
    ],
  }

  const items = mapTree([caseConfig], (item) => {
    return {
      ...item,
      creatable: false,
      removable: false,
      editable: false,
    }
  })

  return items[0]
}

export const caseOptions = [
  amisCase(),
  {
    label: '我的示例',
    removable: false,
    editable: false,
    children: [
      {
        label: '自定义案例1',
        value: 'd2',
        creatable: false,
        removable: false,
      },
    ],
  },
]
