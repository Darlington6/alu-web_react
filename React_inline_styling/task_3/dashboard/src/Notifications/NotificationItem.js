import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

class NotificationItem extends React.PureComponent {
    render() {
        const { id, type, html, value, markAsRead } = this.props;

        if (html) {
            return (
                <li
                    data-notification-type={ type }
                    dangerouslySetInnerHTML={ html }
                    onClick={ () => markAsRead(id) }
                    className={css(type === 'urgent' ? styles.urgent : styles.default)}
                />
            );
        }

        return (
            <li
                data-notification-type={ type }
                onClick={ () => markAsRead(id) }
                className={css(type === 'urgent' ? styles.urgent : styles.default)}
            >{ value }</li>
        );
    }
}

const styles = StyleSheet.create({
    default: {
        color: 'blue',
        listStyleType: 'disc',
        '@media (max-width: 900px)': {
            width: '100%',
            fontSize: '20px',
            padding: '10px 8px',
            borderBottom: '1px solid black',
        },
    },
    urgent: {
        color: 'red',
        listStyleType: 'disc',
        '@media (max-width: 900px)': {
            width: '100%',
            fontSize: '20px',
            padding: '10px 8px',
            borderBottom: '1px solid black',
        },
    },
});

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