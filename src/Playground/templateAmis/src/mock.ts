/**
 * mock数据
 * restapi文档：https://github.com/marmelab/FakeRest#rest-syntax
 * mock数据文档：http://mockjs.com/examples.html 
 */

import sinon from 'sinon';
import { getSinonHandler } from "fakerest";
import Mock from 'mockjs'

// mock api 前缀
const baseUrl = '/mock'

// reset api 处理器
const handler = getSinonHandler({
  baseUrl: baseUrl,
  data: {
    /**
     * 生成 rest api
     * get:/mock/authors
     * get:/mock/authors/:id
     * post:/mock/authors
     * put:/mock/authors/:id
     * delete:/mock/authors/:id
     */
    'authors': Mock.mock({
      "array|3": [{
        "id|+1": 1,
        "first": "@cfirst",
        "last": "@clast"
      }]
    }).array,
    /**
     * 生成 rest api
     * get:/mock/books
     * get:/mock/books/:id
     * post:/mock/books
     * put:/mock/books/:id
     * delete:/mock/books/:id
     */
    'books': Mock.mock({
      "array|3": [{
        "id|+1": 10,
        "title": "@ctitle",
      }]
    }).array,
    /**
     * 生成 rest api
     * get:/mock/settings
     * put:/mock/settings
     */
    'settings': {
      language: 'english',
      preferred_format: 'hardback',
    }
  }
});

// 创建 server (拦截 xhr 请求)
const sever = sinon.fakeServer.create();
sever.autoRespond = true;
sever.xhr.useFilters = true;
sever.xhr.addFilter((method, url) => {
  // 非 /mock 开头的api 不拦截
  const isIgnore = !url.startsWith(baseUrl);
  return isIgnore
});
sever.respondWith(handler)