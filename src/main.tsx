import 'bootstrap/dist/css/bootstrap.min.css'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
// import { AppProvider } from './context/AppContext.tsx'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <AppProvider> */}
        <App />
      {/* </AppProvider> */}
    </BrowserRouter>
  </React.StrictMode>
)

