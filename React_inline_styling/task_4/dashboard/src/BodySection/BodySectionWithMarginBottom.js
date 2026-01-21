import React from 'react';
import PropTypes from 'prop-types';
import BodySection from './BodySection';
import { StyleSheet, css } from 'aphrodite';

const BodySectionWithMarginBottom = (props) => (
    <div className={css(styles.bodySectionWithMargin)}>
        <BodySection { ...props } />
    </div>
);

const styles = StyleSheet.create({
    bodySectionWithMargin: {
        marginBottom: '40px',
    },
});

BodySectionWithMarginBottom.propTypes = {
    ...BodySection.propTypes,
};

BodySectionWithMarginBottom.defaultProps = {
    ...BodySection.defaultProps,
};

export default BodySectionWithMarginBottom;
