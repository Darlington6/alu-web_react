import logo from '../assets/holberton-logo.jpg';
import React from 'react';
import { StyleSheet, css } from 'aphrodite';

function Header() {
    return (
        <div className={css(styles.appHeader)}>
            <img src={ logo } alt="Holberton Logo: Red Seahorse" className={css(styles.logo)} />
            <h1 className={css(styles.title)}>School dashboard</h1>
        </div>
    )
}

const styles = StyleSheet.create({
    appHeader: {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'calc(10px + 2vmin)',
        borderBottom: '4px solid #FF0000',
    },
    logo: {
        // Add any logo-specific styles if needed
    },
    title: {
        maxWidth: 'fit-content',
        color: '#FF0000',
    },
});

export default Header;