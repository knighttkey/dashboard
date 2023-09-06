import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.postcss'
import MainWrap from './MainWrap.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MainWrap/>
  </React.StrictMode>,
)
