import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.postcss'
import { logVersion } from './tools/logVersion'
import MainWrap from './MainWrap.tsx'

logVersion({ name: __APP_NAME__, version: __APP_VERSION__ })
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MainWrap/>
  </React.StrictMode>,
)
