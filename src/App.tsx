/**
 * TODO:
 * !!预览内容使用 iframe 进行隔离。(将预览功能，单独拆出为一个页面)
 */

import { ToastComponent, AlertComponent } from 'amis-ui'

import { Playground } from '@/Playground'

function App() {
  return (
    <>
      <ToastComponent />
      <AlertComponent />
      <Playground />
    </>
  )
}

export default App
