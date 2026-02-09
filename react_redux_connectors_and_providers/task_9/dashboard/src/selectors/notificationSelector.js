import { createSelector } from 'reselect';
import { NotificationTypeFilters } from '../actions/notificationActionTypes';

export const filterTypeSelected = (state) => state.get('filter');

export const getNotifications = (state) => state.get('notifications');

export const getUnreadNotificationsByType = createSelector(
  [filterTypeSelected, getNotifications],
  (filter, notifications) => {
    if (!notifications) {
      return [];
    }

    const list = typeof notifications.valueSeq === 'function'
      ? notifications.valueSeq()
      : Object.values(notifications);

    const unread = list.filter((notification) => {
      const isRead = notification.get ? notification.get('isRead') : notification.isRead;
      return !isRead;
    });

    if (filter === NotificationTypeFilters.URGENT) {
      return unread.filter((notification) => {
        const type = notification.get ? notification.get('type') : notification.type;
        return String(type).toLowerCase() === 'urgent';
      });
    }

    return unread;
  }
);
