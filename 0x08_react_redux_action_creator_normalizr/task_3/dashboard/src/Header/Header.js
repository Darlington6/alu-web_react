import logo from '../assets/holberton-logo.jpg';
import './Header.css';
import React from 'react';
import AppContext from '../App/AppContext';

class Header extends React.Component {
    static contextType = AppContext;

    render() {
        const { user, logOut } = this.context;
        return (
            <>
                <div className="App-header">
                    <img src={ logo } alt="Holberton Logo: Red Seahorse" />
                    <h1>School dashboard</h1>
                </div>
                { user.isLoggedIn && (
                    <section id="logoutSection">
                        Welcome <strong>{ user.email }</strong> (
                        <a onClick={ logOut } href="#logout">logout</a>
                        )
                    </section>
                ) }
            </>
        )
    }
}

export default Header;
