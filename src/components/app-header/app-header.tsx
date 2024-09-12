import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector, RootState } from '../../services/store';

export const AppHeader: FC = () => {
  const userName = useSelector((state: RootState) => state.user.user?.name);
  return <AppHeaderUI userName={userName || ''} />;
};
