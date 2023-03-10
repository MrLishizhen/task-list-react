import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import {Provider} from 'react-redux'
import store from '@/redux/store'

import '@/util/mock/index'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    // <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter basename={'/task-hook/'}>
                <App/>
            </BrowserRouter>
        </Provider>
    // </React.StrictMode>,
)
