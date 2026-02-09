import { Map, fromJS } from 'immutable';
import {
  FETCH_NOTIFICATIONS_SUCCESS,
  MARK_AS_READ,
  SET_TYPE_FILTER,
  NotificationTypeFilters
} from '../actions/notificationActionTypes';
import { notificationsNormalizer } from '../schema/notifications';

const initialState = Map({
  notifications: {},
  filter: NotificationTypeFilters.DEFAULT
});

const notificationReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_SUCCESS: {
      const normalized = notificationsNormalizer(action.data);
      const notifications = Object.keys(
        normalized.entities.notifications || {}
      ).reduce((acc, id) => {
        acc[id] = {
          ...normalized.entities.notifications[id],
          isRead: false
        };
        return acc;
      }, {});

      return state.merge(fromJS({ notifications }));
    }
    case MARK_AS_READ:
      return state.setIn(
        ['notifications', String(action.index), 'isRead'],
        true
      );
    case SET_TYPE_FILTER:
      return state.set('filter', action.filter);
    default:
      return state;
  }
};

export default notificationReducer;
export { initialState };
