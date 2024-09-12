import { FC, useEffect } from 'react';
import { useDispatch, useSelector, RootState } from '../../services/store';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { getFeeds } from '../../slices/feedSlice';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const dispatch = useDispatch();
  const { ordersList, total, totalToday } = useSelector(
    (state: RootState) => state.feed
  );

  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch]);

  const orders: TOrder[] = ordersList;
  const feed = { total, totalToday };

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
