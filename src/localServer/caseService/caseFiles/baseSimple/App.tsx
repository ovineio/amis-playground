/**
 * Amis 渲染入口
 */

import { render, AlertComponent, ToastComponent } from 'amis'
import axios from 'axios'

import amisJson from './amisJson'

const env = {
  // fetcher 为必填参数，否则无法请求 api（以下为极简实现代码）
  fetcher: async (api) => {
    let { url, config, ...restApi } = api

    // url是"/amis/" 开头的，都转换到 amis 文档的 api
    if (typeof url === 'string' && url.startsWith('/amis/')) {
      url = url.replace(/^\/amis\//, 'https://aisuda.bce.baidu.com/amis/')
    }

    const response = await axios({
      url,
      ...restApi,
      ...config,
    })

    return response
  },
}

// 应用入口
const App = () => {
  return (
    <>
      {/* toast 占位组件 */}
      <ToastComponent />
      {/* dialog 占位组件 */}
      <AlertComponent />
      {/* amis 渲染方法，返回 由json 渲染的组件 */}
      {render(amisJson, {}, env)}
    </>
  )
}

export default App
