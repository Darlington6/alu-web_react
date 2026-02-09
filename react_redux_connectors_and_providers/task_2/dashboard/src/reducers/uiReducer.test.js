import uiReducer, { initialState } from './uiReducer';
import { DISPLAY_NOTIFICATION_DRAWER, LOGIN, LOGOUT } from '../actions/uiActionTypes';
import { SELECT_COURSE } from '../actions/courseActionTypes';

describe('uiReducer', () => {
  it('returns initial state when no action is passed', () => {
    expect(uiReducer(undefined, {}).toJS()).toEqual(initialState.toJS());
  });

  it('returns initial state when SELECT_COURSE is passed', () => {
    expect(uiReducer(undefined, { type: SELECT_COURSE }).toJS()).toEqual(
      initialState.toJS()
    );
  });

  it('sets isNotificationDrawerVisible to true on DISPLAY_NOTIFICATION_DRAWER', () => {
    const result = uiReducer(undefined, { type: DISPLAY_NOTIFICATION_DRAWER });
    expect(result.toJS()).toEqual({
      ...initialState.toJS(),
      isNotificationDrawerVisible: true
    });
  });

  it('sets the user on LOGIN', () => {
    const user = { email: 'test@example.com', password: 'pass' };
    const result = uiReducer(undefined, { type: LOGIN, user });
    expect(result.toJS()).toEqual({
      ...initialState.toJS(),
      user
    });
  });

  it('sets the user to null on LOGOUT', () => {
    const user = { email: 'test@example.com', password: 'pass' };
    const loggedInState = uiReducer(undefined, { type: LOGIN, user });
    const result = uiReducer(loggedInState, { type: LOGOUT });
    expect(result.toJS()).toEqual({
      ...initialState.toJS(),
      user: null
    });
  });
});
