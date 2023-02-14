import { Navigate, Outlet } from 'react-router-dom';
import { useAuthState } from '../contexts/AuthContext';

const ProtectedRoute = () => {
  const { authenticated, authenticating } = useAuthState();

  if (!authenticating) {
    return authenticated ? <Outlet /> : <Navigate to={'/login'} />;
  }

  return <></>;
};

export default ProtectedRoute;
