import { normalize, schema } from 'normalizr';
import * as notificationsData from '../../../../notifications.json';

const notifications = notificationsData.default || notificationsData;

export const user = new schema.Entity('users');
export const message = new schema.Entity(
  'messages',
  {},
  {
    idAttribute: 'guid'
  }
);
export const notification = new schema.Entity('notifications', {
  author: user,
  context: message
});

export const normalizedData = normalize(notifications, [notification]);

export const getAllNotificationsByUser = (userId) => {
  const { notifications: notificationsById = {}, messages = {} } =
    normalizedData.entities;

  return normalizedData.result.reduce((acc, notificationId) => {
    const notificationItem = notificationsById[notificationId];

    if (notificationItem && notificationItem.author === userId) {
      const messageItem = messages[notificationItem.context];

      if (messageItem) {
        acc.push(messageItem);
      }
    }

    return acc;
  }, []);
};
