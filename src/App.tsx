/**
 * TODO:
 * 1. 预览内容使用 iframe 进行隔离。(将预览功能，单独拆出为一个页面)
 * 2. 支持移动端
 */

import { ToastComponent, AlertComponent } from 'amis-ui'

import { GlobalAmisHolder } from './Amis'

import { Playground } from '@/Playground'

function App() {
  return (
    <>
      <ToastComponent />
      <AlertComponent />
      <GlobalAmisHolder />
      <Playground />
    </>
  )
}

export default App
