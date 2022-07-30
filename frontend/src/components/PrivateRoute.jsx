import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';
import Spinner from './Spinner';

const PrivateRoute = () => {
 const location = useLocation();
 const { loggedIn, checkingStatus } = useAuthStatus();

 if (checkingStatus) {
  return <Spinner />;
 }

 return loggedIn ? (
  <Outlet />
 ) : (
  <Navigate to='/login' replace state={{ from: location }} />
 );
};

export default PrivateRoute;
