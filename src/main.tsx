// import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // 连续 两次 render 会导致 amis 报错（amis目前不支持）
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <App />
)
