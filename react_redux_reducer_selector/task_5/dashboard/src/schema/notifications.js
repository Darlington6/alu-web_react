import { normalize, schema } from 'normalizr';

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

export const notificationsNormalizer = (data) =>
  normalize(data, [notification]);
