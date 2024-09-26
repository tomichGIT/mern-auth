import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Contexto de Usuario
import { UserProvider } from '@/hooks/useUser'

// v1: Rutas con RouterProvider de CreateBrowserRouter
// import { RouterProvider } from 'react-router-dom'
// import router from './lib/routes/router'

// v2: Contexto de Rutas con BrowserRouter
import { BrowserRouter as Router } from 'react-router-dom'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <Router>
        <App />
      </Router>
      {/* v1: <RouterProvider router={router} /> */}
    </UserProvider>
  </StrictMode>,
)
