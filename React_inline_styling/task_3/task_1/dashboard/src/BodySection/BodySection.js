import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

const BodySection = ({ title, children }) => {
    return (
        <div className={css(styles.bodySection)}>
            <h2 className={css(styles.heading)}>{title}</h2>
            {children}
        </div>
    );
};

const styles = StyleSheet.create({
    bodySection: {
        padding: '20px',
        border: '1px solid #e0e0e0',
        borderRadius: '4px',
        margin: '10px 0',
    },
    heading: {
        marginTop: 0,
        fontSize: '1.5rem',
        color: '#333',
        borderBottom: '2px solid #ddd',
        paddingBottom: '10px',
    },
});

BodySection.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
};

BodySection.defaultProps = {
    children: null,
};

export default BodySection;
