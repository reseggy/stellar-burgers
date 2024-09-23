import orderReducer, {
  getOrders,
  createOrder,
  getOrderByNumber
} from '../orderSlice';

describe('orderSlice tests', () => {
  const initialState = {
    orders: [],
    orderData: null,
    isLoading: false,
    error: null,
    orderRequest: false
  };

  describe('orderSlice reducers', () => {
    describe('getOrders tests', () => {
      test('test getOrders.pending', () => {
        const action = { type: getOrders.pending.type };
        const state = orderReducer(initialState, action);

        expect(state.isLoading).toBeTruthy();
        expect(state.error).toBeNull();
        expect(state.orderRequest).toBeFalsy();
      });

      test('test getOrders.fulfilled', () => {
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

        const orders = [order1, order2];

        const action = { type: getOrders.fulfilled.type, payload: orders };
        const state = orderReducer(initialState, action);

        expect(state.isLoading).toBeFalsy();
        expect(state.error).toBeNull();
        expect(state.orders).toEqual(action.payload);
      });

      test('test getOrders.rejected', () => {
        const action = {
          type: getOrders.rejected.type,
          error: { message: 'Error' }
        };
        const state = orderReducer(initialState, action);

        expect(state.isLoading).toBeFalsy();
        expect(state.error).toEqual(action.error.message);
        expect(state.orders).toEqual([]);
      });
    });

    describe('createOrder tests', () => {
      test('test createOrder.pending', () => {
        const action = { type: createOrder.pending.type };
        const state = orderReducer(initialState, action);

        expect(state.isLoading).toBeTruthy();
        expect(state.orderRequest).toBeTruthy();
        expect(state.error).toBeNull();
        expect(state.orderData).toBeNull();
      });

      test('test createOrder.fulfilled', () => {
        const orderData = {
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

        const action = { type: createOrder.fulfilled.type, payload: orderData };
        const state = orderReducer(initialState, action);

        expect(state.isLoading).toBeFalsy();
        expect(state.orderRequest).toBeFalsy();
        expect(state.error).toBeNull();
        expect(state.orderData).toEqual(action.payload);
        expect(state.orders).toContain(action.payload);
      });

      test('test createOrder.rejected', () => {
        const action = {
          type: createOrder.rejected.type,
          error: { message: 'Error' }
        };
        const state = orderReducer(initialState, action);

        expect(state.isLoading).toBeFalsy();
        expect(state.orderRequest).toBeFalsy();
        expect(state.error).toEqual(action.error.message);
        expect(state.orderData).toBeNull();
      });
    });

    describe('getOrderByNumber tests', () => {
      test('test getOrderByNumber.pending', () => {
        const action = { type: getOrderByNumber.pending.type };
        const state = orderReducer(initialState, action);

        expect(state.isLoading).toBeTruthy();
        expect(state.error).toBeNull();
        expect(state.orderData).toBeNull();
      });

      test('test getOrderByNumber.fulfilled', () => {
        const order = {
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

        const action = {
          type: getOrderByNumber.fulfilled.type,
          payload: order
        };
        const state = orderReducer(initialState, action);

        expect(state.isLoading).toBeFalsy();
        expect(state.orderData).toEqual(action.payload);
      });

      test('test getOrderByNumber.rejected', () => {
        const action = {
          type: getOrderByNumber.rejected.type,
          error: { message: 'Error' }
        };
        const state = orderReducer(initialState, action);

        expect(state.isLoading).toBeFalsy();
        expect(state.error).toEqual(action.error.message);
      });
    });
  });
});
