/**
 * mock数据
 * restapi文档：https://github.com/marmelab/FakeRest#rest-syntax
 * mock数据文档：http://mockjs.com/examples.html 
 */

import sinon from 'sinon';
import { getSinonHandler } from "fakerest";
import Mock from 'mockjs'

const baseUrl = '/mock'

// reset api 处理器
const handler = getSinonHandler({
  baseUrl: baseUrl,
  data: {
    'authors': Mock.mock({
      "array|3": [{
        "id|+1": 1,
        "first": "@cfirst",
        "last": "@clast"
      }]
    }).array,
    'books': Mock.mock({
      "array|3": [{
        "id|+1": 10,
        "title": "@ctitle",
      }]
    }).array,
    'settings': {
      language: 'english',
      preferred_format: 'hardback',
    }
  }
});

// 创建 server 
const sever = sinon.fakeServer.create();
sever.autoRespond = true;
sever.xhr.useFilters = true;
sever.xhr.addFilter((method, url) => {
  const isIgnore = !url.startsWith(baseUrl);
  return isIgnore
});
sever.respondWith(handler)