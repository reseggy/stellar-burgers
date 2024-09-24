import { setCookie } from '../../utils/cookie';
import userReducer, {
  checkAuth,
  logout,
  registerUser,
  loginUser,
  getUser,
  updateUser,
  logoutUser
} from '../userSlice';

describe('userSlice tests', () => {
  const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
  };

  const initialStateLogin = {
    user: {
      email: 'test@mail.ru',
      name: 'testName'
    },
    isAuthenticated: true,
    isLoading: false,
    error: null
  };

  beforeEach(() => {
    // Очистка localStorage перед каждым тестом
    localStorage.clear();

    // Очистка всех куков перед каждым тестом
    document.cookie.split(';').forEach((c) => {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });
  });

  describe('reducers tests', () => {
    test('should return the initial state', () => {
      const state = userReducer(undefined, { type: '@@INIT' });
      expect(state).toEqual(initialState);
    });

    test('should handle unknown action', () => {
      const state = userReducer(initialState, { type: 'UNKNOWN_ACTION' });
      expect(state).toEqual(initialState);
    });
    describe('checkAuth test', () => {
      test('test checkAuth', () => {
        localStorage.setItem('refreshToken', 'testRefreshToken'); // использую библиотеку jest-localstorage-mock для того, чтобы localStorage в тестах работал
        setCookie('accessToken', 'testAccessToken');

        const state = userReducer(initialState, checkAuth());
        expect(state.isAuthenticated).toBeTruthy();
      });
    });

    describe('logout test', () => {
      test('test logout', () => {
        const state = userReducer(initialStateLogin, logout());
        expect(state.user).toBeNull();
        expect(state.isAuthenticated).toBeFalsy();
      });
    });

    describe('registerUser tests', () => {
      test('test registerUser.pending', () => {
        const action = { type: registerUser.pending.type };
        const state = userReducer(initialState, action);

        expect(state.isLoading).toBeTruthy();
        expect(state.error).toBeNull();
      });

      const response = {
        accessToken: 'testAccessToken',
        refreshToken: 'testRefreshToken',
        user: {
          email: 'test@mail.ru',
          name: 'testName'
        }
      };

      test('test registerUser.fulfilled', () => {
        const action = { type: registerUser.fulfilled.type, payload: response };
        const state = userReducer(initialState, action);

        expect(state.isLoading).toBeFalsy();
        expect(state.user).toEqual(response.user);
        expect(state.isAuthenticated).toBeTruthy();
        expect(localStorage.getItem('refreshToken')).toEqual(
          response.refreshToken
        );
        expect(document.cookie).toContain(
          `accessToken=${response.accessToken}`
        );
      });

      test('test registerUser.rejected', () => {
        const action = {
          type: registerUser.rejected.type,
          error: { message: 'Error' }
        };
        const state = userReducer(initialState, action);

        expect(state.isLoading).toBeFalsy();
        expect(state.error).toEqual(action.error.message);
      });
    });

    describe('loginUser tests', () => {
      test('test loginUser.pending', () => {
        const action = { type: loginUser.pending.type };
        const state = userReducer(initialState, action);

        expect(state.isLoading).toBeTruthy();
        expect(state.error).toBeNull();
      });

      const response = {
        accessToken: 'testAccessToken',
        refreshToken: 'testRefreshToken',
        user: {
          email: 'test@mail.ru',
          name: 'testName'
        }
      };

      test('test loginUser.fulfilled', () => {
        const action = { type: loginUser.fulfilled.type, payload: response };
        const state = userReducer(initialState, action);

        expect(state.isLoading).toBeFalsy();
        expect(state.user).toEqual(response.user);
        expect(state.isAuthenticated).toBeTruthy();
        expect(localStorage.getItem('refreshToken')).toEqual(
          response.refreshToken
        );
        expect(document.cookie).toContain(
          `accessToken=${response.accessToken}`
        );
      });

      test('test loginUser.rejected', () => {
        const action = {
          type: loginUser.rejected.type,
          error: { message: 'error' }
        };
        const state = userReducer(initialState, action);

        expect(state.isLoading).toBeFalsy();
        expect(state.error).toEqual(action.error.message);
      });
    });

    describe('getUser tests', () => {
      test('test getUser.pending', () => {
        const action = { type: getUser.pending.type };
        const state = userReducer(initialState, action);

        expect(state.isLoading).toBeTruthy();
        expect(state.error).toBeNull();
      });

      test('test getUser.fulfilled', () => {
        const user = {
          email: 'test@mail.ru',
          name: 'testName'
        };

        const action = { type: getUser.fulfilled.type, payload: user };
        const state = userReducer(initialState, action);

        expect(state.isLoading).toBeFalsy();
        expect(state.user).toEqual(action.payload);
      });

      test('test getUser.rejected', () => {
        const action = {
          type: getUser.rejected.type,
          error: { message: 'Error' }
        };
        const state = userReducer(initialState, action);

        expect(state.isLoading).toBeFalsy();
        expect(state.error).toEqual(action.error.message);
      });
    });

    describe('updateUser tests', () => {
      test('test updateUser.pending', () => {
        const action = { type: updateUser.pending.type };
        const state = userReducer(initialState, action);

        expect(state.isLoading).toBeTruthy();
        expect(state.error).toBeNull();
      });

      test('test updateUser.fulfilled', () => {
        const user = {
          email: 'test@mail.ru',
          name: 'testName'
        };

        const action = { type: updateUser.fulfilled.type, payload: user };
        const state = userReducer(initialState, action);

        expect(state.isLoading).toBeFalsy();
        expect(state.user).toEqual(action.payload);
      });

      test('test updateUser.rejected', () => {
        const action = {
          type: updateUser.rejected.type,
          error: { message: 'Error' }
        };
        const state = userReducer(initialState, action);

        expect(state.isLoading).toBeFalsy();
        expect(state.error).toEqual(action.error.message);
      });
    });

    describe('logoutUser tests', () => {
      test('test logoutUser.pending', () => {
        const action = { type: logoutUser.pending.type };
        const state = userReducer(initialState, action);

        expect(state.isLoading).toBeTruthy();
        expect(state.error).toBeNull();
      });

      test('test logoutUser.fulfilled', () => {
        const action = { type: logoutUser.fulfilled.type };
        const state = userReducer(initialState, action);

        expect(state.isLoading).toBeFalsy();
        expect(state.isAuthenticated).toBeFalsy();
        expect(state.user).toBeNull();
      });

      test('test logoutUser.rejected', () => {
        const action = {
          type: logoutUser.rejected.type,
          error: { message: 'Error' }
        };
        const state = userReducer(initialState, action);

        expect(state.isLoading).toBeFalsy();
        expect(state.error).toEqual(action.error.message);
      });
    });
  });
});
