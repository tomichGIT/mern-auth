
// Formulario de Login para mostrar en página de acceso restringido
import Login from '@/pages/Login'

// Hooks
import {useUser} from '@/hooks/useUser'


export const PrivateRoute = ({ children }) => {
    const { user } = useUser();
    //return user ? children : <Navigate to="/login" />;
    return user ? children 
                : (<>
                    <p className="text-red-500">Acces restringido para usuarios</p>
                    {/* <Login /> */}
                  </>)
}
