

// Layout Stuff
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

// Rutas Stuff
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from '@/components/PrivateRoute'

// Páginas
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Registro from '@/pages/Registro'
import Admin from '@/pages/Admin'


function App() {
 
  return (
    <>
    <div className="flex flex-col min-h-screen">
      
      <Header />
      
      <main className="flex-1 p-4 w-full bg-gray-200">

        {/* <Outlet /> */}
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/admin" element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          } />
        </Routes>

      </main>

      <Footer />

    </div>
    </>
  )


  
}

export default App