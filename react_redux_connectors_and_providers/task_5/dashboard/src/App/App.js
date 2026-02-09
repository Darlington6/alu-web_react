import './App.css';
import React from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import Notifications from '../Notifications/Notifications';
import CourseList from '../CourseList/CourseList';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import AppContext, { defaultUser, defaultLogOut } from './AppContext';
import {
  displayNotificationDrawer,
  hideNotificationDrawer,
  loginRequest
} from '../actions/uiActionCreators';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: defaultUser
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(event) {
    if (event.ctrlKey && event.key === 'h') {
      alert('Logging you out');
      defaultLogOut();
    }
  }

  render() {
    const { user } = this.state;
    const {
      isLoggedIn,
      displayDrawer,
      displayNotificationDrawer,
      hideNotificationDrawer,
      login
    } = this.props;
    const contextValue = {
      user: user,
      logOut: defaultLogOut,
    };

    const listCourses = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 },
    ];

    return (
      <AppContext.Provider value={ contextValue }>
        <>
          <Notifications 
            displayDrawer={ displayDrawer } 
            handleDisplayDrawer={ displayNotificationDrawer }
            handleHideDrawer={ hideNotificationDrawer }
          />
          <div className="App">
            <Header />
            { isLoggedIn ? (
              <BodySectionWithMarginBottom title="Course list">
                <CourseList listCourses={ listCourses } />
              </BodySectionWithMarginBottom>
            ) : (
              <BodySectionWithMarginBottom title="Log in to continue">
                <Login logIn={ login } />
              </BodySectionWithMarginBottom>
            ) }
            <BodySection title="News from the School">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </BodySection>
            <Footer />
          </div>
        </>
      </AppContext.Provider>
    )
  }
}

export const mapStateToProps = (state) => ({
  isLoggedIn: state.ui.isUserLoggedIn,
  displayDrawer: state.ui.isNotificationDrawerVisible
});

App.propTypes = {
  isLoggedIn: PropTypes.bool,
  displayDrawer: PropTypes.bool,
  displayNotificationDrawer: PropTypes.func,
  hideNotificationDrawer: PropTypes.func,
  login: PropTypes.func
};

App.defaultProps = {
  isLoggedIn: false,
  displayDrawer: false,
  displayNotificationDrawer: () => {},
  hideNotificationDrawer: () => {},
  login: () => {}
};

export default hot(
  module
)(
  connect(mapStateToProps, {
    displayNotificationDrawer,
    hideNotificationDrawer,
    login: loginRequest
  })(App)
);
