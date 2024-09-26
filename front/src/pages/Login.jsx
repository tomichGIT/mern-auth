import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/hooks/useUser';
import { Button } from '@/components/Button';

const Login = () => {
  const [formData, setFormData] = useState({ 
    username: '', 
    password: ''
  });
  const [error, setError] = useState(null); // Mensajes de error del formulario

  // uso de mi custom hook useUser
  const { login, user } = useUser();

  // si entran a /login y ya están logueados, los redirigimos a /admin
  useEffect(() => {
    if (user) {  navigate('/');  }
  }, [user]);

  // Navigate me permite ir a cualquier sección usando JS
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    
    setFormData(prevData => ({
      ...prevData,
      [name]: value 
    }));

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Dejamos que useUser se encarga del Login
    const errorMessage = await login(formData);
    if (errorMessage) {
      setError(errorMessage); // mostramos mensaje de error si lo hay
    } else {
      setError(null); // quitamos el error si se ha solucionado
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h1>Login</h1>
      {error && <p className="text-red-500">{error}</p>} {/* Posibles errores de Login */}
      <input onChange={handleChange} value={formData.username} type="email" name="username" placeholder="Email" required />
      <input onChange={handleChange} value={formData.password} type="password" name="password" placeholder="Password" required />
      <Button type="submit">Login</Button>
    </form>
  );
};

export default Login;