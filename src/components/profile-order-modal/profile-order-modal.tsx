import { FC } from 'react';
import { ProfileOrderModalProps } from './type';
import { useParams } from 'react-router-dom';
import { Modal } from '../modal';
import { OrderInfo } from '../order-info';

const ProfileOrderModal: FC<ProfileOrderModalProps> = ({ onClose }) => {
  const { number } = useParams<{ number: string }>();
  return (
    <Modal title={`#${number}`} onClose={onClose}>
      <OrderInfo />
    </Modal>
  );
};

export default ProfileOrderModal;
