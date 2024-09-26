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

      // Aquí enviaríamos los datos a nuestro backend
      // y recibiríamos la respuesta antes de establecer el usuario
      const response = await fetch(`${VITE_BACKEND_URL}/api/v1/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          //'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(userData)
      });
      const responseData = await response.json();
      if (!response.ok) {
        console.error('Error:', responseData.message);
        return
      }

      //const responseData = userData;

      console.log(responseData);
      setUser(responseData);
      localStorage.setItem('user', JSON.stringify(responseData));
      //  // Store the token in localStorage
      //  localStorage.setItem('token', data.token);
    };

    const register = async (userData) => {

      try {
        // Aquí enviaríamos los datos a nuestro backend
        // y recibiríamos la respuesta antes de establecer el usuario

        // const response = await fetch(`${VITE_BACKEND_URL}/api/v1/register`, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify(userData)
        // });
        // const responseData = await response.json();
        // if (!response.ok) {
        //   console.error('Error:', responseData.message);
        //   return;
        // }

        const responseData = userData;

        setUser(responseData);
        localStorage.setItem('user', JSON.stringify(responseData));

      } catch (e) {
        console.error('Error:', e);
        return;
      }
    };

    const logout = () => {
      setUser(null);
      localStorage.removeItem('user');
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