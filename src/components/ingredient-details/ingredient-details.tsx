import { FC } from 'react';
import { useParams, Location } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector, RootState } from '../../services/store';

interface IngredientDetailsProps {
  background?: Location;
}

export const IngredientDetails: FC<IngredientDetailsProps> = ({
  background
}) => {
  const { id } = useParams();
  const { ingredients } = useSelector((state: RootState) => state.ingredients);

  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return (
    <IngredientDetailsUI
      ingredientData={ingredientData}
      background={background}
    />
  );
};
