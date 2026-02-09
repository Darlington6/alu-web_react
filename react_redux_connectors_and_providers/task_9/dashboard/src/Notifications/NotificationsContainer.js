import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Notifications from './Notifications';
import { getUnreadNotificationsByType } from '../selectors/notificationSelector';
import {
  fetchNotifications,
  markAsAread,
  setNotificationFilter
} from '../actions/notificationActionCreators';

export class NotificationsContainer extends React.PureComponent {
  componentDidMount() {
    const { fetchNotifications } = this.props;
    fetchNotifications();
  }

  render() {
    return <Notifications { ...this.props } />;
  }
}

NotificationsContainer.propTypes = {
  fetchNotifications: PropTypes.func,
  listNotifications: PropTypes.array,
  displayDrawer: PropTypes.bool,
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
  markNotificationAsRead: PropTypes.func,
  setNotificationFilter: PropTypes.func
};

NotificationsContainer.defaultProps = {
  fetchNotifications: () => {},
  listNotifications: [],
  displayDrawer: false,
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
  markNotificationAsRead: () => {},
  setNotificationFilter: () => {}
};

export const mapStateToProps = (state) => {
  const unreadNotifications = getUnreadNotificationsByType(state.notifications);

  if (Array.isArray(unreadNotifications)) {
    return { listNotifications: unreadNotifications };
  }

  return { listNotifications: unreadNotifications.toArray() };
};

export default connect(mapStateToProps, {
  fetchNotifications,
  markNotificationAsRead: markAsAread,
  setNotificationFilter
})(NotificationsContainer);
