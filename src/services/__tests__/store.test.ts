import store from '../store';

describe('store reducers test', () => {
  test('should return the initial state', () => {
    const state = store.getState();
    const expectedState = {
      ingredients: {
        ingredients: [],
        isLoading: false,
        error: null
      },
      user: {
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      },
      order: {
        orders: [],
        orderData: null,
        isLoading: false,
        error: null,
        orderRequest: false
      },
      feed: {
        ordersList: [],
        total: 0,
        totalToday: 0,
        isLoading: false,
        error: null
      },
      burgerConstructor: {
        bun: null,
        ingredients: []
      },
    };
    expect(state).toEqual(expectedState);
  });
})
