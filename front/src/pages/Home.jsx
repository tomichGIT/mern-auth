import { useUser } from '@/hooks/useUser';

const Home = () => {

  const { user } = useUser();

    return (
      <>
      <h1 className="text-2xl font-bold mb-4">Home</h1>
      <small>Sección Pública</small>

{user ? 
      <p>Bienvenido <strong>{user.name}</strong>, ya tienes acceso a todas las secciones de la web.</p>
:
      <p>Bienvenido <strong>Anónimo</strong>, registrate o accede a tu cuenta para ver la lista de usuarios registrados.</p>
}
      </>
    )
  }

  export default Home;