import React from 'react';
import './Notifications.css';
import close_icon from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchNotifications } from '../actions/notificationActionCreators';

export class Notifications extends React.PureComponent {
    componentDidMount() {
        const { fetchNotifications } = this.props;
        fetchNotifications();
    }

    render() {
        const { displayDrawer, listNotifications, handleDisplayDrawer, handleHideDrawer, markNotificationAsRead } = this.props;
        return (
            <>
            <div className="menuItem" onClick={ handleDisplayDrawer }>
                Your notifications
            </div>
            {displayDrawer &&
            <div className="Notifications">
                { listNotifications.length > 0 ? (
                    <>
                        <button
                            aria-label="Close"
                            onClick={ handleHideDrawer }
                        ><img
                                src={ close_icon }
                                alt="Close"
                            />
                        </button>
                        <p>Here is the list of notifications</p>
                        <ul>
                            { listNotifications.map((notification) => (
                                <NotificationItem
                                    key={ notification.id }
                                    id={ notification.id }
                                    type={ notification.type }
                                    value={ notification.value }
                                    html={ notification.html }
                                    markAsRead={ markNotificationAsRead }
                                />
                            )) }
                        </ul>
                    </>
                ) : <p>No new notification for now</p> }
            </div>
            }
            </>
        );
    }
}

Notifications.propTypes = {
    displayDrawer: PropTypes.bool,
    listNotifications: PropTypes.array,
    handleDisplayDrawer: PropTypes.func,
    handleHideDrawer: PropTypes.func,
    markNotificationAsRead: PropTypes.func,
    fetchNotifications: PropTypes.func,
};

Notifications.defaultProps = {
    displayDrawer: false,
    listNotifications: [],
    handleDisplayDrawer: () => {},
    handleHideDrawer: () => {},
    markNotificationAsRead: () => {},
    fetchNotifications: () => {},
}

export const mapStateToProps = (state) => {
    const notifications = state.notifications.get('notifications');

    if (!notifications) {
        return { listNotifications: [] };
    }

    if (typeof notifications.valueSeq === 'function') {
        return { listNotifications: notifications.valueSeq().toArray() };
    }

    return { listNotifications: Object.values(notifications) };
};

export default connect(mapStateToProps, { fetchNotifications })(Notifications);
