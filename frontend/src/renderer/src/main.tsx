import App from './App'
import store from './store'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { NextUIProvider } from '@nextui-org/react'
import { CurrentAvatarFileProvider } from './providers/SelectAvatarProvider'
import './styles/main.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <NextUIProvider>
        <HashRouter>
          <CurrentAvatarFileProvider>
            <App />
          </CurrentAvatarFileProvider>
        </HashRouter>
      </NextUIProvider>
    </Provider>
  </React.StrictMode>,
)
