import { createContext, useContext, useState, useEffect } from 'react';

// Crear un contexto de Usuario
const UserContext = createContext();


// Crear un provider
// lo exporto para usar en main.jsx
export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    // Cargar variable de entorno VITE_BACKEND_URL
    const { VITE_BACKEND_URL } = import.meta.env;

    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
          setUser(JSON.parse(storedUser));
      }
    }, []);


    const login = async (userData) => {

      try {

        // Aquí enviaríamos los datos a nuestro backend
        // y recibiríamos la respuesta antes de establecer el usuario
        const response = await fetch(`${VITE_BACKEND_URL}/api/v1/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });
        const responseData = await response.json();
        if (!response.ok) {
          return responseData.message;
        }

        // extraemos el usuario de la respuesta
        const usuario=responseData.data;

        console.log(responseData);
        setUser(usuario);
        
        // Guardamos el Usuario en LocalStorage
        localStorage.setItem('user', JSON.stringify(usuario));
        
        // Guardamos el JWT token en LocalStorage
        localStorage.setItem('token', responseData.token);

        return null; // no hay error
         
      } catch (e) {
        console.error('Error:', e);
        return "Error en el servidor";
      }

      
    };

    const register = async (userData) => {

      try {
        // Aquí enviamos los datos a nuestro backend
        // y recibiríamos la respuesta antes de establecer el usuario

        const response = await fetch(`${VITE_BACKEND_URL}/api/v1/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });
        const responseData = await response.json();
        if (!response.ok) {
          return responseData.message;
        }

        // extraemos el usuario de la respuesta
        const usuario=responseData.data;

        setUser(usuario);

        // Guardamos el Usuario en LocalStorage
        localStorage.setItem('user', JSON.stringify(usuario));
        
        // Guardamos el JWT token en LocalStorage
        localStorage.setItem('token', responseData.token);

        return null; // no hay error
      } catch (e) {
        console.error('Error:', e);
        return "Error en el servidor";
      }
    };

    const logout = () => {
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    };

    return (
      // Pasamos al contexto el usuario y las funciones de login, logout y register
      <UserContext.Provider value={{ user, login, logout, register }}>
        {children}
      </UserContext.Provider>
    );
}

// Crear un Custom hook para usar nuestro Contexto de Usuario
// se exporta para usar desde Cualquier Componente
export function useUser() {
    return useContext(UserContext);
}