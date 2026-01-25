import React from 'react';
import './Notifications.css';
import close_icon from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';
import PropTypes from 'prop-types';
import NotificationItemShape from './NotificationItemShape';

class Notifications extends React.Component {
    constructor(props) {
        super(props);
        this.markAsRead = this.markAsRead.bind(this);
    }

    markAsRead(id) {
        console.log(`Notification ${id} has been marked as read`);
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.listNotifications.length > this.props.listNotifications.length || nextProps.displayDrawer !== this.props.displayDrawer;
    }

    render() {
        const { displayDrawer, listNotifications, handleDisplayDrawer, handleHideDrawer } = this.props;
        return (
            <>
            <div className="menuItem" onClick={ () => { handleDisplayDrawer(); } }>
                Your notifications
            </div>
            {displayDrawer &&
            <div className="Notifications">
                { listNotifications.length > 0 ? (
                    <>
                        <button
                            aria-label="Close"
                            onClick={ () => { handleHideDrawer(); } }
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
                                    markAsRead={ this.markAsRead }
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
    listNotifications: PropTypes.arrayOf(NotificationItemShape),
    handleDisplayDrawer: PropTypes.func,
    handleHideDrawer: PropTypes.func,
};

Notifications.defaultProps = {
    displayDrawer: false,
    listNotifications: [],
    handleDisplayDrawer: () => {},
    handleHideDrawer: () => {},
}

export default Notifications;
