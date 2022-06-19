import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'mobx-react'
import stores from './stores'
import Router from './router'
import '@/styles/global.less'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider stores={stores}>
      <Router />
    </Provider>
  </React.StrictMode>
)
