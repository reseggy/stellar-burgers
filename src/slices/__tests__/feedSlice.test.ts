import feedReducer, { getFeeds } from '../feedSlice';

describe('feedSlice tests', () => {
  const initialState = {
    ordersList: [],
    total: 0,
    totalToday: 0,
    isLoading: false,
    error: null
  };
  describe('reducers tests', () => {
    test('should return the initial state', () => {
      const state = feedReducer(undefined, { type: '@@INIT' });
      expect(state).toEqual(initialState);
    });

    test('should handle unknown action', () => {
      const state = feedReducer(initialState, { type: 'UNKNOWN_ACTION' });
      expect(state).toEqual(initialState);
    });

    test('test getFeeds.pending', () => {
      const action = { type: getFeeds.pending.type };
      const state = feedReducer(initialState, action);

      expect(state.isLoading).toBeTruthy();
      expect(state.error).toBeNull();
      expect(state.ordersList).toEqual([]);
    });

    test('test getFeeds.fulfilled', () => {
      const order1 = {
        _id: '1',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093f'
        ],
        status: 'done',
        name: 'Order 1',
        createdAt: '2024-09-22T15:09:49.848Z',
        updatedAt: '2024-09-22T15:09:50.326Z',
        number: 1
      };

      const order2 = {
        _id: '2',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093f'
        ],
        status: 'done',
        name: 'Order 2',
        createdAt: '2024-09-22T15:09:49.848Z',
        updatedAt: '2024-09-22T15:09:50.326Z',
        number: 2
      };

      const response = {
        orders: [order1, order2],
        total: 10,
        totalToday: 5
      };

      const action = { type: getFeeds.fulfilled.type, payload: response };
      const state = feedReducer(initialState, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBeNull();
      expect(state.ordersList).toEqual(action.payload.orders);
      expect(state.total).toEqual(action.payload.total);
      expect(state.totalToday).toEqual(action.payload.totalToday);
    });

    test('test getFeeds.rejected', () => {
      const action = {
        type: getFeeds.rejected.type,
        error: { message: 'Error' }
      };
      const state = feedReducer(initialState, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.error).toEqual(action.error.message);
      expect(state.ordersList).toEqual([]);
    });
  });
});
