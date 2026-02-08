import './Footer.css';
import { getFullYear, getFooterCopy } from '../utils/utils';
import React from 'react';
import AppContext from '../App/AppContext';

function Footer() {
    return (
        <AppContext.Consumer>
            { (context) => (
                <div className="App-footer">
                    <p>Copyright { getFullYear() } - { getFooterCopy(true) }</p>
                    { context.user.isLoggedIn && (
                        <p>
                            <a href="#contact">Contact us</a>
                        </p>
                    ) }
                </div>
            ) }
        </AppContext.Consumer>
    );
}

export default Footer;

