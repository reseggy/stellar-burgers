import { TIngredient } from '@utils-types';
import { Location } from 'react-router-dom';

export type IngredientDetailsUIProps = {
  ingredientData: TIngredient;
  background?: Location;
};
