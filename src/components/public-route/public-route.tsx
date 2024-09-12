import { FC } from 'react';
import { useSelector, RootState } from '../../services/store';
import { Navigate } from 'react-router-dom';
import { PublicRouteProps } from './type';

const PublicRoute: FC<PublicRouteProps> = ({ element }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  return !isAuthenticated ? element : <Navigate to='/profile' />;
};

export default PublicRoute;
