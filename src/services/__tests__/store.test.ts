import constructorReducer from '../../slices/сonstructorSlice';
import userReducer from '../../slices/userSlice';
import orderReducer from '../../slices/orderSlice';
import ingredientReducer from '../../slices/ingredientsSlice';
import feedReducer from '../../slices/feedSlice';

import { rootReducer } from '../store';

describe('store reducers test', () => {
  test('initial state correctly', () => {
    const action = { type: '@@INIT' };
    const state = rootReducer(undefined, action);
    expect(state).toEqual({
      burgerConstructor: constructorReducer(undefined, action),
      feed: feedReducer(undefined, action),
      ingredients: ingredientReducer(undefined, action),
      order: orderReducer(undefined, action),
      user: userReducer(undefined, action)
    });
  });

  test('unknown action correctly', () => {
    const action = { type: 'UNKNOWN' };
    const state = rootReducer(undefined, action);
    expect(state).toEqual({
      burgerConstructor: constructorReducer(undefined, action),
      feed: feedReducer(undefined, action),
      ingredients: ingredientReducer(undefined, action),
      order: orderReducer(undefined, action),
      user: userReducer(undefined, action)
    });
  });
});
