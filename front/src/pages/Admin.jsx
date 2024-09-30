import { useEffect, useState } from "react";

const Admin = () => {
  const [users, setUsers] = useState([]);

  // datos que envìo
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    file: null
  });

  // imagen que me devolvio
  const [profileImage, setProfileImage] = useState(null);

    useEffect(() => { 
      getUsers();
    }, []);
    // Cargar variable de entorno VITE_BACKEND_URL
    const { VITE_BACKEND_URL } = import.meta.env;
    const getUsers = async () => {
      const token = localStorage.getItem('token'); // obtengo el Token JWT del localStorage

      const response = await fetch(`${VITE_BACKEND_URL}/api/v1/users`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const responseData = await response.json();
        console.log(responseData);
        setUsers(responseData.data);
    }

   
  
    const handleFileChange = (e) => {
      setFormData({
        ...formData,
        file: e.target.files[0],
      });
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };


  // upload de archivos
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    if (formData.file) {
      data.append('profile', formData.file);
    }

    fetch(`${VITE_BACKEND_URL}/api/v1/upload`, {
      method: 'POST',
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // show the image in the frontend using data.url from the response
        setProfileImage(data.url);

      })
      .catch((error) => console.log(error));
  }


    return ( 
      <>
      <h1 className="text-2xl font-bold mb-4">Admin</h1>
      <small>Sección Privada</small>
      <p className="mb-4">La lista de usuario es solo accesible por <strong>Usuarios Autenticados</strong></p>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 border-b">
          <th className="py-2 px-4 border-r">id</th>
          <th className="py-2 px-4 border-r">Nombre</th>
          <th className="py-2 px-4">Usuario/Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map(({id, name, username}) => (
            <tr key={id} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4 border-r">{id}</td>
              <td className="py-2 px-4 border-r">{name}</td>
              <td className="py-2 px-4">{username}</td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
      

        {/* Subir archivo a http://localhost:3000/api/v1/uploads */}
      <div>
      <h1 className="text-2xl font-bold mb-4">Subir Archivos</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
              value={formData.name}
              name="name"
              onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Correo:</label>
          <input
            type="email"
              value={formData.email}
              name="email"
              onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Imágen de Perfil:</label>
          <input type="file" name="profile" onChange={handleFileChange} required />
        </div>
        <button type="submit">Enviar</button>
      </form>

      {profileImage && (
        <div>
          <h2>Imagen de Perfil</h2>
          <img src={profileImage} alt="profile" />
        </div>
      )}
    </div>
      </>
    );
  }
  
  export default Admin;