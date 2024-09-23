import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/hooks/useUser';
import { Button } from '@/components/Button';

const Registro = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    image: 'https://picsum.photos/200',
    tyc: false
  });

  // solo para habilitar el botón de submit
  const [canSubmit, setCanSubmit] = useState(false);

  // Botón de Submit: si todo es true, setear canSubmit a true
  useEffect(() => {
    setCanSubmit(formData.name && formData.username && formData.password && formData.tyc);
    //console.log(formData);
  }, [formData]);


  const { register } = useUser();

  // Navigate me permite ir a cualquier sección usando JS
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(formData);
    navigate('/admin');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h1>Registro</h1>
      <input onChange={handleChange} type="text" name="name" placeholder="Nombre" required />
      <input onChange={handleChange} type="email" name="username" placeholder="Email" required />
      <input onChange={handleChange} type="password" name="password" placeholder="Clave" required />
      <label>
        <input onChange={handleChange} type="checkbox" name="tyc" /> Acepto TyC
      </label>

      <Button type="submit" disabled={!canSubmit}>
        {canSubmit ? 'Registrarse' : 'Complete TODOS los datos'}
      </Button>
    </form>
  );
};

export default Registro;