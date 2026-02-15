import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <AuthProvider>
    <BrowserRouter>
    <App />
    <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable={false} 
      pauseOnHover
      theme="light"
    />
    </BrowserRouter>
    </AuthProvider>

  </StrictMode>
)
