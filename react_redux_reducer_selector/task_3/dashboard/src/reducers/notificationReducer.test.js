import notificationReducer, { initialState } from './notificationReducer';
import {
  FETCH_NOTIFICATIONS_SUCCESS,
  MARK_AS_READ,
  SET_TYPE_FILTER,
  NotificationTypeFilters
} from '../actions/notificationActionTypes';

describe('notificationReducer', () => {
  const notifications = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', value: 'New data available' }
  ];

  it('returns default state', () => {
    expect(notificationReducer(undefined, {})).toEqual(initialState);
  });

  it('returns data passed with FETCH_NOTIFICATIONS_SUCCESS', () => {
    const result = notificationReducer(undefined, {
      type: FETCH_NOTIFICATIONS_SUCCESS,
      data: notifications
    });

    expect(result).toEqual({
      filter: 'DEFAULT',
      notifications: [
        { id: 1, isRead: false, type: 'default', value: 'New course available' },
        { id: 2, isRead: false, type: 'urgent', value: 'New resume available' },
        { id: 3, isRead: false, type: 'urgent', value: 'New data available' }
      ]
    });
  });

  it('marks the correct notification as read', () => {
    const state = notificationReducer(undefined, {
      type: FETCH_NOTIFICATIONS_SUCCESS,
      data: notifications
    });

    const result = notificationReducer(state, { type: MARK_AS_READ, index: 2 });

    expect(result).toEqual({
      filter: 'DEFAULT',
      notifications: [
        { id: 1, isRead: false, type: 'default', value: 'New course available' },
        { id: 2, isRead: true, type: 'urgent', value: 'New resume available' },
        { id: 3, isRead: false, type: 'urgent', value: 'New data available' }
      ]
    });
  });

  it('sets the correct notification filter', () => {
    const state = notificationReducer(undefined, {
      type: FETCH_NOTIFICATIONS_SUCCESS,
      data: notifications
    });

    const result = notificationReducer(state, {
      type: SET_TYPE_FILTER,
      filter: NotificationTypeFilters.URGENT
    });

    expect(result).toEqual({
      filter: 'URGENT',
      notifications: [
        { id: 1, isRead: false, type: 'default', value: 'New course available' },
        { id: 2, isRead: false, type: 'urgent', value: 'New resume available' },
        { id: 3, isRead: false, type: 'urgent', value: 'New data available' }
      ]
    });
  });
});
