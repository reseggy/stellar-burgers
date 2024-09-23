import ingredientReducer, { fetchIngredients } from '../ingredientsSlice';

describe('ingredientSlice tests', () => {
  const initialState = {
    ingredients: [],
    isLoading: false,
    error: null
  };
  describe('reducers tests', () => {
    test('test fetchIngredients.pending', () => {
      const action = { type: fetchIngredients.pending.type };
      const state = ingredientReducer(initialState, action);

      expect(state.isLoading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    test('test fetchIngredients.fulfilled', () => {
      const ingredient1 = {
        _id: '1',
        name: 'Ingredient 1',
        type: 'sauce',
        proteins: 10,
        fat: 5,
        carbohydrates: 20,
        calories: 100,
        price: 50,
        image: 'image1',
        image_large: 'image_large1',
        image_mobile: 'image_mobile1'
      };

      const ingredient2 = {
        _id: '2',
        name: 'Ingredient 2',
        type: 'main',
        proteins: 20,
        fat: 2,
        carbohydrates: 10,
        calories: 200,
        price: 20,
        image: 'image2',
        image_large: 'image_large2',
        image_mobile: 'image_mobile2'
      };

      const ingredients = [ingredient1, ingredient2];

      const action = {
        type: fetchIngredients.fulfilled.type,
        payload: ingredients
      };
      const state = ingredientReducer(initialState, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBeNull();
      expect(state.ingredients).toEqual(action.payload);
    });

    test('test fetchIngredients.error', () => {
      const action = {
        type: fetchIngredients.rejected.type,
        error: { message: 'Error' }
      };
      const state = ingredientReducer(initialState, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.ingredients).toEqual([]);
      expect(state.error).toBe(action.error.message);
    });
  });
});
