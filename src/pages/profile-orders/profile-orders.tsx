import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { RootState } from 'src/services/store';
import { useDispatch, useSelector } from '../../services/store';
import { getOrders } from '../../slices/orderSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state: RootState) => state.order);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
