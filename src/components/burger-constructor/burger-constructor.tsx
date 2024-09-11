import { FC, useMemo, useState } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { RootState } from 'src/services/store';
import { useDispatch, useSelector } from '../../services/store';
import { createOrder } from '../../slices/orderSlice';
import { useNavigate } from 'react-router-dom';
import { clearConstructor } from '../../slices/сonstructorSlice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const { bun, ingredients } = useSelector(
    (store: RootState) => store.burgerConstructor
  );

  const { user } = useSelector((store: RootState) => store.user);

  const constructorItems = {
    bun: bun,
    ingredients: ingredients
  };

  const { orderRequest, orderData } = useSelector(
    (store: RootState) => store.order
  );

  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false); //реализовал так, потом понял, что можно было через navigate(-1), но решил оставить так

  const orderModalData = orderData;

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!constructorItems.bun || orderRequest) return;
    const ingredientsIds = ingredients.map((ingredient) => ingredient._id);
    if (bun) {
      ingredientsIds.push(bun._id);
      ingredientsIds.push(bun._id);
    }
    dispatch(createOrder(ingredientsIds)).finally(() => {
      dispatch(clearConstructor()); //очищаем конструктор при успешном заказе
    });
    setIsModalOpen(true);
  };

  const closeOrderModal = () => {
    setIsModalOpen(false);
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
      isModalOpen={isModalOpen}
    />
  );
};
