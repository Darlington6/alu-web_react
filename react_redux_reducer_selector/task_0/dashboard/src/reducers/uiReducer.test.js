import uiReducer, { initialState } from './uiReducer';
import { DISPLAY_NOTIFICATION_DRAWER } from '../actions/uiActionTypes';
import { SELECT_COURSE } from '../actions/courseActionTypes';

describe('uiReducer', () => {
  it('returns initial state when no action is passed', () => {
    expect(uiReducer(undefined, {})).toEqual(initialState);
  });

  it('returns initial state when SELECT_COURSE is passed', () => {
    expect(uiReducer(undefined, { type: SELECT_COURSE })).toEqual(initialState);
  });

  it('sets isNotificationDrawerVisible to true on DISPLAY_NOTIFICATION_DRAWER', () => {
    const result = uiReducer(undefined, { type: DISPLAY_NOTIFICATION_DRAWER });
    expect(result).toEqual({
      ...initialState,
      isNotificationDrawerVisible: true
    });
  });
});
