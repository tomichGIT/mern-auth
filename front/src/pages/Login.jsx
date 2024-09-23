import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/hooks/useUser';
import { Button } from '@/components/Button';

const Login = () => {
  const [formData, setFormData] = useState({ 
    username: '', 
    password: '',
    // le agrego a mano name e image, pero estos vienen desde la DB en useUser 
    name: "tomi",
    image: 'https://picsum.photos/200' 
  });

  const { login } = useUser();

  // Navigate me permite ir a cualquier sección usando JS
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    
    setFormData(prevData => ({
      ...prevData,
      [name]: value 
    }));

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // En una aplicación real, aquí verificaríamos las credenciales con el servidor
    login(formData);
    navigate('/admin');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h1>Login</h1>
      <input onChange={handleChange} type="email" name="username" placeholder="Email" required />
      <input onChange={handleChange} type="password" name="password" placeholder="Password" required />
      <Button type="submit">Login</Button>
    </form>
  );
};

export default Login;