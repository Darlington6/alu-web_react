import React from 'react';
import './Notifications.css';
import close_icon from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';
import PropTypes from 'prop-types';
import { NotificationTypeFilters } from '../actions/notificationActionTypes';
export const Notifications = ({
    displayDrawer,
    listNotifications,
    handleDisplayDrawer,
    handleHideDrawer,
    markNotificationAsRead,
    setNotificationFilter
}) => (
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
                    <div className="notificationFilter">
                        <button
                            type="button"
                            aria-label="Filter urgent"
                            onClick={ () => setNotificationFilter(NotificationTypeFilters.URGENT) }
                        >‼️</button>
                        <button
                            type="button"
                            aria-label="Filter default"
                            onClick={ () => setNotificationFilter(NotificationTypeFilters.DEFAULT) }
                        >💠</button>
                    </div>
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

Notifications.propTypes = {
    displayDrawer: PropTypes.bool,
    listNotifications: PropTypes.array,
    handleDisplayDrawer: PropTypes.func,
    handleHideDrawer: PropTypes.func,
    markNotificationAsRead: PropTypes.func,
    setNotificationFilter: PropTypes.func,
};

Notifications.defaultProps = {
    displayDrawer: false,
    listNotifications: [],
    handleDisplayDrawer: () => {},
    handleHideDrawer: () => {},
    markNotificationAsRead: () => {},
    setNotificationFilter: () => {},
}

export default Notifications;
