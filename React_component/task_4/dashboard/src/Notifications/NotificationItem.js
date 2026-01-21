import React from 'react';
import './Notifications.css';
import PropTypes from 'prop-types';

const NotificationItem = ({ id, type, html, value, markAsRead }) => {
    if (html) {
        return (
            <li
                data-notification-type={ type }
                dangerouslySetInnerHTML={ html }
                onClick={ () => markAsRead(id) }
            />
        );
    }
    return (
        <li
            data-notification-type={ type }
            onClick={ () => markAsRead(id) }
        >{ value }</li>
    );
};

NotificationItem.propTypes = {
    id: PropTypes.number,
    type: PropTypes.string,
    html: PropTypes.shape({ __html: PropTypes.string }),
    value: PropTypes.string,
    markAsRead: PropTypes.func,
};

NotificationItem.defaultProps = {
    id: 0,
    type: 'default',
    html: undefined,
    value: '',
    markAsRead: () => {},
};

export default NotificationItem;