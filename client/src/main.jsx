import { StrictMode } from 'react'
import ReactDom from 'react-dom/client'
import { createRoot } from 'react-dom/client'
import { BrowserRouter} from 'react-router-dom'
//import './css/index.css'
import App from './App.jsx'
import { AuthProvider } from './auth/AuthProvider.jsx'
import './i18n.js'

ReactDom.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
        <App />
    </AuthProvider>
  </BrowserRouter>,
)
