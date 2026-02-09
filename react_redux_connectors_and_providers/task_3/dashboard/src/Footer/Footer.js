import './Footer.css';
import { getFullYear, getFooterCopy } from '../utils/utils';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export function Footer({ user }) {
    return (
        <div className="App-footer">
            <p>Copyright { getFullYear() } - { getFooterCopy(true) }</p>
            { user.isLoggedIn && (
                <p>
                    <a href="#contact">Contact us</a>
                </p>
            ) }
        </div>
    );
}

export const mapStateToProps = (state) => ({
    user: state.uiReducer.user
});

Footer.propTypes = {
    user: PropTypes.shape({
        isLoggedIn: PropTypes.bool
    })
};

Footer.defaultProps = {
    user: { isLoggedIn: false }
};

export default connect(mapStateToProps)(Footer);

