import React from 'react';
import { StyleSheet, css } from 'aphrodite';

function Login() {
    return (
        <div className={css(styles.appBody)}>
            <p className={css(styles.text)}>Login to access the full dashboard</p>
            <div className={css(styles.form)}>
                <label htmlFor="email" className={css(styles.label)}>
                    <span className={css(styles.labelSpan)}>Email:</span>
                    <input type="email" name="email" id="email" className={css(styles.input)} />
                </label>

                <label htmlFor="password" className={css(styles.label)}>
                    <span className={css(styles.labelSpan)}>Password:</span>
                    <input type="password" name="password" id="pwd" className={css(styles.input)} />
                </label>

                <button onClick={ () => { } } className={css(styles.button)}>OK</button>
            </div>
        </div>
    );
}

const styles = StyleSheet.create({
    appBody: {
        minHeight: '60vmin',
        padding: '32px',
    },
    text: {
        fontWeight: 'bold',
    },
    form: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '8px',
        alignItems: 'center',
        '@media (max-width: 900px)': {
            flexDirection: 'column',
            alignItems: 'flex-start',
        },
    },
    label: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        '@media (max-width: 900px)': {
            width: '100%',
        },
    },
    labelSpan: {
        paddingLeft: '2px',
        fontWeight: 'bold',
        marginRight: '16px',
        marginBottom: '8px',
        '@media (max-width: 900px)': {
            marginRight: '0',
            marginBottom: '4px',
        },
    },
    input: {
        height: '32px',
        lineHeight: '16px',
        fontSize: '16px',
        paddingLeft: '2px',
        marginTop: '2px',
        '@media (max-width: 900px)': {
            width: '100%',
        },
    },
    button: {
        borderRadius: '25px',
        width: '150px',
        height: '32px',
        backgroundColor: 'white',
        fontSize: '24px',
        border: '.5px solid lightgrey',
        '@media (max-width: 900px)': {
            width: '100%',
            marginTop: '16px',
        },
    },
});

export default Login;