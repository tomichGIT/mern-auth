
import {useUser} from '@/hooks/useUser'
import { Link, NavLink } from 'react-router-dom';

export const Header = () => {
    const { user, logout } = useUser();
    return (
      <header className="bg-gray-800 text-white w-full">
        <nav className="p-2 justify-between flex items-center">
        <NavLink to="/"><h1>MERN - sistema Auth</h1></NavLink>
          <ul className="flex gap-5">
            <li><NavLink to="/">Home</NavLink></li>
  
            {/* {user && <li><NavLink  to="/admin">Admin</NavLink></li>} */}
            <li><NavLink  to="/admin">Admin (Priv)</NavLink></li>
  
            {user ? (
              <>
                <li>
                  <img src={user.image} alt={user.name} className="w-8 h-8 rounded-full" />
                </li>
                <h3 className="mt-1">{user.name}</h3>
                <li><NavLink onClick={logout}>Logout</NavLink></li>
              </>
            ) : (
              <>
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/registro">Registro</NavLink></li>
              </>
            )}
          </ul>
        </nav>
      </header>
    );
  }