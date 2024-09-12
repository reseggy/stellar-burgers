import { FC } from 'react';
import { ProtectedRouteProps } from './type';
import { useSelector, RootState } from '../../services/store';
import { Navigate } from 'react-router-dom';

const ProtectedRoute: FC<ProtectedRouteProps> = ({ element }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  return isAuthenticated ? element : <Navigate to='/login' />;
};

export default ProtectedRoute;
