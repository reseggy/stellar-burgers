import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { checkAuth, getUser } from '../../slices/userSlice';
import { fetchIngredients } from '../../slices/ingredientsSlice';
import { getCookie } from '../../utils/cookie';
import { refreshToken as refresh } from '../../utils/burger-api';
import PublicRoute from '../public-route/public-route';
import ProtectedRoute from '../protected-route/protected-route';
import FeedOrderModal from '../feed-order-modal/feed-order-modal';
import ProfileOrderModal from '../profile-order-modal/profile-order-modal';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const locationState = location.state as { background?: Location };
  const background = locationState && locationState.background;

  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = getCookie('accessToken');
    dispatch(fetchIngredients());

    if (refreshToken && accessToken) {
      dispatch(checkAuth());
      dispatch(getUser());
    } else if (refreshToken) {
      refresh().then(() => {
        dispatch(checkAuth());
        dispatch(getUser());
      });
    }
  }, [dispatch]);

  const onClose = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<PublicRoute element={<Login />} />} />
        <Route
          path='/register'
          element={<PublicRoute element={<Register />} />}
        />
        <Route
          path='/forgot-password'
          element={<PublicRoute element={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<PublicRoute element={<ResetPassword />} />}
        />
        <Route
          path='/profile'
          element={<ProtectedRoute element={<Profile />} />}
        />
        <Route
          path='/profile/orders'
          element={<ProtectedRoute element={<ProfileOrders />} />}
        />
        <Route path='*' element={<NotFound404 />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route
          path='/ingredients/:id'
          element={<IngredientDetails background={location} />}
        />
      </Routes>
      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={<FeedOrderModal onClose={onClose} />}
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title={'Детали ингредиента'} onClose={onClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute
                element={<ProfileOrderModal onClose={onClose} />}
              />
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
