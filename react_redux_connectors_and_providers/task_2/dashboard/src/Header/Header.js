import logo from '../assets/holberton-logo.jpg';
import './Header.css';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/uiActionCreators';

class Header extends React.Component {
    render() {
        const { user, logout } = this.props;
        return (
            <>
                <div className="App-header">
                    <img src={ logo } alt="Holberton Logo: Red Seahorse" />
                    <h1>School dashboard</h1>
                </div>
                { user.isLoggedIn && (
                    <section id="logoutSection">
                        Welcome <strong>{ user.email }</strong> (
                        <a onClick={ logout } href="#logout">logout</a>
                        )
                    </section>
                ) }
            </>
        )
    }
}

export const mapStateToProps = (state) => ({
    user: state.uiReducer.user
});

Header.propTypes = {
    user: PropTypes.shape({
        isLoggedIn: PropTypes.bool,
        email: PropTypes.string
    }),
    logout: PropTypes.func
};

Header.defaultProps = {
    user: { isLoggedIn: false, email: '' },
    logout: () => {}
};

export default connect(mapStateToProps, { logout })(Header);
