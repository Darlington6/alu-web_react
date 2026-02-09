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
import { getLatestNotification } from '../utils/utils';
import AppContext, { defaultUser, defaultLogOut } from './AppContext';
import {
  displayNotificationDrawer,
  hideNotificationDrawer
} from '../actions/uiActionCreators';

class App extends React.Component {
  constructor(props) {
    super(props);
    const htmlObj = getLatestNotification();
    this.state = {
      user: defaultUser,
      logOut: this.logOut.bind(this),
      listNotifications: [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New course available' },
        { id: 3, type: 'urgent', html: htmlObj },
      ],
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.logIn = this.logIn.bind(this);
    this.markNotificationAsRead = this.markNotificationAsRead.bind(this);
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
      this.state.logOut();
    }
  }

  logIn(email, password) {
    this.setState({
      user: {
        email,
        password,
        isLoggedIn: true,
      },
    });
  }

  logOut() {
    this.setState({
      user: defaultUser,
    });
  }

  markNotificationAsRead(id) {
    this.setState({
      listNotifications: this.state.listNotifications.filter(
        (notification) => notification.id !== id
      ),
    });
  }

  render() {
    const { user, listNotifications } = this.state;
    const {
      isLoggedIn,
      displayDrawer,
      displayNotificationDrawer,
      hideNotificationDrawer
    } = this.props;
    const contextValue = {
      user: user,
      logOut: this.logOut,
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
            listNotifications={ listNotifications }
            handleDisplayDrawer={ displayNotificationDrawer }
            handleHideDrawer={ hideNotificationDrawer }
            markNotificationAsRead={ this.markNotificationAsRead }
          />
          <div className="App">
            <Header />
            { isLoggedIn ? (
              <BodySectionWithMarginBottom title="Course list">
                <CourseList listCourses={ listCourses } />
              </BodySectionWithMarginBottom>
            ) : (
              <BodySectionWithMarginBottom title="Log in to continue">
                <Login logIn={ this.logIn } />
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
  isLoggedIn: state.uiReducer.isUserLoggedIn,
  displayDrawer: state.uiReducer.isNotificationDrawerVisible
});

App.propTypes = {
  isLoggedIn: PropTypes.bool,
  displayDrawer: PropTypes.bool,
  displayNotificationDrawer: PropTypes.func,
  hideNotificationDrawer: PropTypes.func
};

App.defaultProps = {
  isLoggedIn: false,
  displayDrawer: false,
  displayNotificationDrawer: () => {},
  hideNotificationDrawer: () => {}
};

export default hot(
  module
)(connect(mapStateToProps, { displayNotificationDrawer, hideNotificationDrawer })(App));
