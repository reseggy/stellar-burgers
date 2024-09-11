import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { RootState } from 'src/services/store';
import { getFeeds } from '../../slices/feedSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { ordersList } = useSelector((state: RootState) => state.feed);
  const orders: TOrder[] = ordersList;

  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch]);

  useEffect(() => {}, [ordersList]);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeeds())} />;
};
