import { Map, fromJS } from 'immutable';
import {
  filterTypeSelected,
  getNotifications,
  getUnreadNotifications
} from './notificationSelector';

const initialNotifications = [
  { id: 1, isRead: false, type: 'default', value: 'New course available' },
  { id: 2, isRead: true, type: 'urgent', value: 'New resume available' },
  { id: 3, isRead: false, type: 'urgent', value: 'New data available' }
];

describe('notification selectors', () => {
  const state = Map({
    filter: 'DEFAULT',
    notifications: fromJS({
      1: initialNotifications[0],
      2: initialNotifications[1],
      3: initialNotifications[2]
    })
  });

  it('filterTypeSelected returns the current filter', () => {
    expect(filterTypeSelected(state)).toBe('DEFAULT');
  });

  it('getNotifications returns the notifications map', () => {
    const notifications = getNotifications(state);
    expect(notifications.toJS()).toEqual({
      1: initialNotifications[0],
      2: initialNotifications[1],
      3: initialNotifications[2]
    });
  });

  it('getUnreadNotifications returns unread notifications map', () => {
    const unread = getUnreadNotifications(state);
    expect(unread.toJS()).toEqual({
      1: initialNotifications[0],
      3: initialNotifications[2]
    });
  });
});
