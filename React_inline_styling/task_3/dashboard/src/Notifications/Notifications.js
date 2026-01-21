import React from 'react';
import close_icon from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';
import PropTypes from 'prop-types';
import NotificationItemShape from './NotificationItemShape';
import { StyleSheet, css } from 'aphrodite';

class Notifications extends React.Component {
    constructor(props) {
        super(props);
        this.markAsRead = this.markAsRead.bind(this);
    }

    markAsRead(id) {
        console.log(`Notification ${id} has been marked as read`);
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.listNotifications.length > this.props.listNotifications.length;
    }

    render() {
        const { displayDrawer, listNotifications } = this.props;
        return (
            <>
            <div className={css(styles.menuItem)}>
                Your notifications
            </div>
            {displayDrawer &&
            <div className={css(styles.notifications)}>
                { listNotifications.length > 0 ? (
                    <>
                        <button
                            aria-label="Close"
                            onClick={ () => {
                                console.log('Close button has been clicked');
                            } }
                            className={css(styles.button)}
                        ><img
                                src={ close_icon }
                                alt="Close"
                                className={css(styles.buttonImg)}
                            />
                        </button>
                        <p className={css(styles.listTitle)}>Here is the list of notifications</p>
                        <ul className={css(styles.notificationsList)}>
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

const styles = StyleSheet.create({
    notifications: {
        border: '2px dashed #FF0000',
        padding: '24px',
        position: 'relative',
        '@media (max-width: 900px)': {
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            width: '100vw',
            height: '100vh',
            padding: '0',
            margin: '0',
            zIndex: '9999',
            overflowY: 'auto',
        },
    },
    notificationsList: {
        listStyleType: 'disc',
        paddingLeft: '20px',
        '@media (max-width: 900px)': {
            padding: '0',
        },
    },
    listTitle: {
        '@media (max-width: 900px)': {
            fontSize: '20px',
        },
    },
    menuItem: {
        position: 'absolute',
        top: '0',
        right: '0',
        margin: '10px',
        cursor: 'pointer',
    },
    button: {
        float: 'right',
        height: '25px',
        width: '25px',
        position: 'absolute',
        top: '16px',
        right: '16px',
        background: 'none',
        border: 'none',
        '@media (max-width: 900px)': {
            top: '10px',
            right: '10px',
        },
    },
    buttonImg: {
        height: '20px',
        width: '20px',
    },
});

Notifications.propTypes = {
    displayDrawer: PropTypes.bool,
    listNotifications: PropTypes.arrayOf(NotificationItemShape),
};

Notifications.defaultProps = {
    displayDrawer: false,
    listNotifications: [],
}

export default Notifications;