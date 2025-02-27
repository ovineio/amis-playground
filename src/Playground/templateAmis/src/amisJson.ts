/**
 * amis json 配置： 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components
 * 可以修改看效果：支持注册自定义filer/rule/function，注册自定义组件 等等功能
 * 
 */

const amisJson = {
  type: 'page',
  body: [{
    type: 'form',
    debug: true,
    "mode": "horizontal",
    title: '添加用户',
    resetAfterSubmit: true,
    api: 'post:/mock/authors',
    reload: 'crud',
    body: [{
      type: 'input-text',
      name: 'first',
      label: '姓氏'
    }, {
      type: 'input-text',
      name: 'last',
      label: '名字'
    }]
  }, {
    type: 'crud',
    name: 'crud',
    api: '/mock/authors',
    "columns": [{
        "name": "id",
        "label": "ID"
      },
      {
        "name": "first",
        "label": "姓氏"
      },
      {
        "name": "last",
        "label": "名字"
      },
      {
        "type": "operation",
        "label": "操作",
        "buttons": [{
            "label": "修改",
            "type": "button",
            "actionType": "dialog",
            "dialog": {
              "title": "修改用户ID：${id}",
              "body": {
                "type": "form",
                api: 'put:/mock/authors/$id',
                "body": [{
                    "type": "input-text",
                    "name": "first",
                    "label": "姓氏"
                  },
                  {
                    "type": "input-text",
                    "name": "last",
                    "label": "名字",
                  }
                ]
              }
            }
          },
          {
            "label": "删除",
            "type": "button",
            "actionType": "ajax",
            "level": "danger",
            "confirmText": "确认要删除？",
            "api": "delete:/mock/authors/$id"
          }
        ]
      }
    ]
  }]
};

export default amisJson;