import React from 'react';
import './Notifications.css';
import close_icon from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    fetchNotifications,
    markAsAread,
    setNotificationFilter
} from '../actions/notificationActionCreators';
import { NotificationTypeFilters } from '../actions/notificationActionTypes';
import { getUnreadNotificationsByType } from '../selectors/notificationSelector';

export class Notifications extends React.PureComponent {
    componentDidMount() {
        const { fetchNotifications } = this.props;
        fetchNotifications();
    }

    render() {
        const {
            displayDrawer,
            listNotifications,
            handleDisplayDrawer,
            handleHideDrawer,
            markNotificationAsRead,
            setNotificationFilter
        } = this.props;
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
    }
}

Notifications.propTypes = {
    displayDrawer: PropTypes.bool,
    listNotifications: PropTypes.array,
    handleDisplayDrawer: PropTypes.func,
    handleHideDrawer: PropTypes.func,
    markNotificationAsRead: PropTypes.func,
    fetchNotifications: PropTypes.func,
    setNotificationFilter: PropTypes.func,
};

Notifications.defaultProps = {
    displayDrawer: false,
    listNotifications: [],
    handleDisplayDrawer: () => {},
    handleHideDrawer: () => {},
    markNotificationAsRead: () => {},
    fetchNotifications: () => {},
    setNotificationFilter: () => {},
}

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
})(Notifications);
