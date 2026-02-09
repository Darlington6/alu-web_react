import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  setLoadingState,
  setNotifications,
  fetchNotifications
} from './notificationActionCreators';
import {
  SET_LOADING_STATE,
  FETCH_NOTIFICATIONS_SUCCESS
} from './notificationActionTypes';

jest.mock('node-fetch', () => fetchMock);

const mockStore = configureMockStore([thunk]);

describe('notification action creators', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('setLoadingState returns the correct action', () => {
    expect(setLoadingState(true)).toEqual({
      type: SET_LOADING_STATE,
      loading: true
    });
  });

  it('setNotifications returns the correct action', () => {
    const data = [{ id: 1, type: 'default', value: 'Test' }];
    expect(setNotifications(data)).toEqual({
      type: FETCH_NOTIFICATIONS_SUCCESS,
      data
    });
  });

  it('fetchNotifications dispatches loading and notifications actions', () => {
    const data = [{ id: 1, type: 'default', value: 'Test' }];
    fetchMock.getOnce('/notifications.json', {
      status: 200,
      body: data
    });

    const store = mockStore({});

    return store.dispatch(fetchNotifications()).then(() => {
      expect(store.getActions()).toEqual([
        { type: SET_LOADING_STATE, loading: true },
        { type: FETCH_NOTIFICATIONS_SUCCESS, data },
        { type: SET_LOADING_STATE, loading: false }
      ]);
    });
  });
});
