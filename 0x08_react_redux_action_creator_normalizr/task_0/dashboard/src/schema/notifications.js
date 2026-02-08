import * as notificationsData from '../../../../notifications.json';

const notifications = notificationsData.default || notificationsData;

export const getAllNotificationsByUser = (userId) => {
  return notifications
    .filter((notification) => notification.author.id === userId)
    .map((notification) => notification.context);
};
