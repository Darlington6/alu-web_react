import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { loginRequest } from './uiActionCreators';
import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE } from './uiActionTypes';

jest.mock('node-fetch', () => fetchMock);

const mockStore = configureMockStore([thunk]);

describe('loginRequest', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('dispatches LOGIN and LOGIN_SUCCESS on successful response', () => {
    fetchMock.getOnce('/login-success.json', {
      status: 200,
      body: { data: 'ok' }
    });

    const store = mockStore({});

    return store.dispatch(loginRequest('test@test.com', 'password')).then(() => {
      expect(store.getActions()).toEqual([
        {
          type: LOGIN,
          user: { email: 'test@test.com', password: 'password' }
        },
        { type: LOGIN_SUCCESS }
      ]);
    });
  });

  it('dispatches LOGIN and LOGIN_FAILURE on failed response', () => {
    fetchMock.getOnce('/login-success.json', 500);

    const store = mockStore({});

    return store.dispatch(loginRequest('test@test.com', 'password')).then(() => {
      expect(store.getActions()).toEqual([
        {
          type: LOGIN,
          user: { email: 'test@test.com', password: 'password' }
        },
        { type: LOGIN_FAILURE }
      ]);
    });
  });
});
