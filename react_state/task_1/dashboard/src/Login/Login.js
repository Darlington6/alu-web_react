import './Login.css';
import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            email: '',
            password: '',
            enableSubmit: false,
        };
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }

    handleLoginSubmit(event) {
        event.preventDefault();
        this.setState({ isLoggedIn: true });
    }

    handleChangeEmail(event) {
        const email = event.target.value;
        this.setState({ email }, () => {
            const { email: updatedEmail, password } = this.state;
            this.setState({ enableSubmit: updatedEmail.length > 0 && password.length > 0 });
        });
    }

    handleChangePassword(event) {
        const password = event.target.value;
        this.setState({ password }, () => {
            const { email, password: updatedPassword } = this.state;
            this.setState({ enableSubmit: email.length > 0 && updatedPassword.length > 0 });
        });
    }

    render() {
        const { email, password, enableSubmit } = this.state;
        return (
            <div className="App-body">
                <p>Login to access the full dashboard</p>
                <form onSubmit={ this.handleLoginSubmit }>
                    <label htmlFor="email">
                        <span>Email:</span>
                        <input 
                            type="email" 
                            name="email" 
                            id="email"
                            value={ email }
                            onChange={ this.handleChangeEmail }
                        />
                    </label>

                    <label htmlFor="password">
                        <span>Password:</span>
                        <input 
                            type="password" 
                            name="password" 
                            id="pwd"
                            value={ password }
                            onChange={ this.handleChangePassword }
                        />
                    </label>

                    <input 
                        type="submit" 
                        value="OK"
                        disabled={ !enableSubmit }
                    />
                </form>
            </div>
        );
    }
}

Login.propTypes = {
};

Login.defaultProps = {
};

export default Login;
