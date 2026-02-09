import { fromJS } from 'immutable';
import {
  filterTypeSelected,
  getNotifications,
  getUnreadNotificationsByType
} from './notificationSelector';
import { NotificationTypeFilters } from '../actions/notificationActionTypes';

describe('notification selectors', () => {
  const state = fromJS({
    filter: NotificationTypeFilters.DEFAULT,
    notifications: {
      1: { id: 1, type: 'default', value: 'New course available', isRead: false },
      2: { id: 2, type: 'urgent', value: 'New resume available', isRead: true },
      3: { id: 3, type: 'urgent', value: 'New data available', isRead: false }
    }
  });

  it('filterTypeSelected returns the filter', () => {
    expect(filterTypeSelected(state)).toEqual(NotificationTypeFilters.DEFAULT);
  });

  it('getNotifications returns the notifications', () => {
    expect(getNotifications(state).toJS()).toEqual({
      1: { id: 1, type: 'default', value: 'New course available', isRead: false },
      2: { id: 2, type: 'urgent', value: 'New resume available', isRead: true },
      3: { id: 3, type: 'urgent', value: 'New data available', isRead: false }
    });
  });

  it('getUnreadNotificationsByType returns all unread when filter is default', () => {
    const result = getUnreadNotificationsByType(state);
    expect(result.toJS()).toEqual([
      { id: 1, type: 'default', value: 'New course available', isRead: false },
      { id: 3, type: 'urgent', value: 'New data available', isRead: false }
    ]);
  });

  it('getUnreadNotificationsByType returns unread urgent when filter is urgent', () => {
    const urgentState = state.set('filter', NotificationTypeFilters.URGENT);
    const result = getUnreadNotificationsByType(urgentState);
    expect(result.toJS()).toEqual([
      { id: 3, type: 'urgent', value: 'New data available', isRead: false }
    ]);
  });
});
