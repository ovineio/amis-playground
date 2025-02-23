/**
 * Amis 渲染入口
 */

import { render, AlertComponent, ToastComponent } from 'amis'
import amisJson from './amisJson'
import env from './env'

import './app.global.css'

const App = () => {
  return (
    <div>
      <ToastComponent theme='cxd' locale='zh' />
      <AlertComponent theme='cxd' locale='zh' />
      {render(amisJson, {}, env)}
    </div>
  )
}

export default App
