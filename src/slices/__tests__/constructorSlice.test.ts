import { TConstructorIngredient } from '@utils-types';
import constructorReducer, {
  addIngredient,
  deleteIngredient,
  moveIngredientUp,
  moveIngredientsDown,
  clearConstructor
} from '../сonstructorSlice';

describe('constructorSlice tests', () => {
  const initialState = {
    bun: null,
    ingredients: []
  };

  const ingredient1: TConstructorIngredient = {
    _id: '1',
    name: '1',
    type: 'sauce',
    proteins: 1,
    fat: 1,
    carbohydrates: 1,
    calories: 1,
    price: 1,
    image: '1',
    image_large: '1',
    image_mobile: '1',
    id: '1'
  };

  const ingredient2: TConstructorIngredient = {
    _id: '2',
    name: '2',
    type: 'main',
    proteins: 2,
    fat: 2,
    carbohydrates: 2,
    calories: 2,
    price: 2,
    image: '2',
    image_large: '2',
    image_mobile: '2',
    id: '222222'
  };

  const ingredient3: TConstructorIngredient = {
    _id: '3',
    name: '3',
    type: 'main',
    proteins: 3,
    fat: 3,
    carbohydrates: 3,
    calories: 3,
    price: 3,
    image: '3',
    image_large: '3',
    image_mobile: '3',
    id: '333333'
  };

  const bun: TConstructorIngredient = {
    _id: '4',
    name: '4',
    type: 'bun',
    proteins: 4,
    fat: 4,
    carbohydrates: 4,
    calories: 4,
    price: 4,
    image: '4',
    image_large: '4',
    image_mobile: '4',
    id: '4'
  };

  describe('reducers tests', () => {
    test('should return the initial state', () => {
      const state = constructorReducer(undefined, { type: '@@INIT' });
      expect(state).toEqual(initialState);
    });

    test('should handle unknown action', () => {
      const state = constructorReducer(initialState, {
        type: 'UNKNOWN_ACTION'
      });
      expect(state).toEqual(initialState);
    });

    test('Handle add Ingredient', () => {
      const state = constructorReducer(
        initialState,
        addIngredient(ingredient1)
      );

      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]).toEqual(ingredient1);
    });

    test('Handle add Ingredient(bun)', () => {
      const state = constructorReducer(initialState, addIngredient(bun));

      expect(state.ingredients).toHaveLength(0);
      expect(state.bun).toEqual(bun);
    });

    test('Handle delete Ingredient', () => {
      const initialStateWithIngredient = {
        bun: null,
        ingredients: [ingredient1, ingredient2]
      };

      const state = constructorReducer(
        initialStateWithIngredient,
        deleteIngredient(0)
      );

      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]).toEqual(ingredient2);
    });

    describe('ingredients move tests', () => {
      test('Handle move Up Ingredient', () => {
        const initialStateWithIngredient = {
          bun: null,
          ingredients: [ingredient1, ingredient2, ingredient3]
        };

        const state = constructorReducer(
          initialStateWithIngredient,
          moveIngredientUp(1)
        );

        expect(state.ingredients).toHaveLength(3);
        expect(state.ingredients).toEqual([
          ingredient2,
          ingredient1,
          ingredient3
        ]);
      });

      test('Handle move Down Ingredient', () => {
        const initialStateWithIngredient = {
          bun: null,
          ingredients: [ingredient1, ingredient2, ingredient3]
        };

        const state = constructorReducer(
          initialStateWithIngredient,
          moveIngredientsDown(0)
        );

        expect(state.ingredients).toHaveLength(3);
        expect(state.ingredients).toEqual([
          ingredient2,
          ingredient1,
          ingredient3
        ]);
      });
    });

    test('Clear Constructor', () => {
      const initialStateWithIngredient = {
        bun: bun,
        ingredients: [ingredient1]
      };

      const state = constructorReducer(
        initialStateWithIngredient,
        clearConstructor()
      );

      expect(state.ingredients).toHaveLength(0);
      expect(state.bun).toEqual(null);
    });
  });
});
