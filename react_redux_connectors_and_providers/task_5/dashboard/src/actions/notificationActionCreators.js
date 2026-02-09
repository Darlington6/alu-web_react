import { bindActionCreators } from 'redux';
import fetch from 'node-fetch';
import {
  MARK_AS_READ,
  SET_TYPE_FILTER,
  SET_LOADING_STATE,
  FETCH_NOTIFICATIONS_SUCCESS
} from './notificationActionTypes';

export const markAsAread = (index) => ({
  type: MARK_AS_READ,
  index
});

export const setNotificationFilter = (filter) => ({
  type: SET_TYPE_FILTER,
  filter
});

export const setLoadingState = (loading) => ({
  type: SET_LOADING_STATE,
  loading
});

export const setNotifications = (data) => ({
  type: FETCH_NOTIFICATIONS_SUCCESS,
  data
});

export const fetchNotifications = () => {
  return (dispatch) => {
    dispatch(setLoadingState(true));

    return fetch('/notifications.json')
      .then((response) => response.json())
      .then((data) => {
        dispatch(setNotifications(data));
        dispatch(setLoadingState(false));
      })
      .catch(() => dispatch(setLoadingState(false)));
  };
};

export const boundMarkAsAread = (dispatch) =>
  bindActionCreators(markAsAread, dispatch);

export const boundSetNotificationFilter = (dispatch) =>
  bindActionCreators(setNotificationFilter, dispatch);
