export const filterTypeSelected = (state) => state.get('filter');

export const getNotifications = (state) => state.get('notifications');

export const getUnreadNotifications = (state) => {
  const notifications = state.get('notifications');

  if (!notifications) {
    return [];
  }

  return notifications
    .valueSeq()
    .filter((notification) => !notification.get('isRead'));
};
