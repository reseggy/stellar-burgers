import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Modal } from '../modal';
import { OrderInfo } from '../order-info';
import { FeedOrderModalProps } from './type';

const FeedOrderModal: FC<FeedOrderModalProps> = ({ onClose }) => {
  const { number } = useParams<{ number: string }>();
  return (
    <Modal title={`#${number}`} onClose={onClose}>
      <OrderInfo />
    </Modal>
  );
};

export default FeedOrderModal;
