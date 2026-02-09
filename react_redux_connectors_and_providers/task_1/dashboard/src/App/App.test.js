import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import App, { mapStateToProps } from './App';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Notifications from '../Notifications/Notifications';
import CourseList from '../CourseList/CourseList';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';

describe('<App />', () => {
    it('renders an <App /> component', () => {
        const wrapper = shallow(<App />);
        expect(wrapper).toHaveLength(1);
    });

    it('renders an <App /> component checking for <Notifications />', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(Notifications)).toHaveLength(1);
    });

    it('renders an <App /> component checking for <Header />', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(Header)).toHaveLength(1);
    });

    it('renders an <App /> component checking for <Login />', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(Login)).toHaveLength(1);
    });

    it('tests to check that CourseList is not displayed', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(CourseList)).toHaveLength(0);
    });

    it('renders an <App /> component checking for <Footer />', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(Footer)).toHaveLength(1);
    });

    describe('when user is logged in via state', () => {
        it('verifies that the Login component is not displayed when user is logged in', () => {
            const wrapper = shallow(<App />);
            const instance = wrapper.instance();
            instance.logIn('test@example.com', 'password');
            wrapper.update();
            expect(wrapper.find(Login)).toHaveLength(0);
        });

        it('verifies that the CourseList component is displayed when user is logged in', () => {
            const wrapper = shallow(<App />);
            const instance = wrapper.instance();
            instance.logIn('test@example.com', 'password');
            wrapper.update();
            expect(wrapper.find(CourseList)).toHaveLength(1);
        });
    });

    it('wraps Login inside BodySectionWithMarginBottom when logged out', () => {
        const wrapper = shallow(<App />);
        const sections = wrapper.find(BodySectionWithMarginBottom);
        expect(sections).toHaveLength(1);
        expect(sections.at(0).props().title).toEqual('Log in to continue');
        expect(sections.at(0).find(Login)).toHaveLength(1);
    });

    it('wraps CourseList inside BodySectionWithMarginBottom when logged in', () => {
        const wrapper = shallow(<App />);
        const instance = wrapper.instance();
        instance.logIn('test@example.com', 'password');
        wrapper.update();
        const sections = wrapper.find(BodySectionWithMarginBottom);
        expect(sections).toHaveLength(1);
        expect(sections.at(0).props().title).toEqual('Course list');
        expect(sections.at(0).find(CourseList)).toHaveLength(1);
    });

    it('renders the News body section with text', () => {
        const wrapper = shallow(<App />);
        const newsSection = wrapper.find(BodySection).findWhere(
            (node) => node.props().title === 'News from the School'
        );
        expect(newsSection).toHaveLength(1);
        expect(newsSection.dive().find('p').text()).toContain('Lorem ipsum');
    });

    describe('when ctrl + h keys are pressed', () => {
        it('calls logOut function and displays alert', () => {
            const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
            
            const wrapper = shallow(<App />);
            const instance = wrapper.instance();
            instance.logIn('test@example.com', 'password');
            
            const event = new KeyboardEvent('keydown', {
                ctrlKey: true,
                key: 'h',
            });
            
            instance.handleKeyDown(event);
            
            expect(alertMock).toHaveBeenCalledWith('Logging you out');
            expect(wrapper.state().user.isLoggedIn).toBe(false);
            
            alertMock.mockRestore();
        });
    });

    it('verifies that default displayDrawer state is false and can be toggled', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.state().displayDrawer).toBe(false);
        wrapper.instance().handleDisplayDrawer();
        expect(wrapper.state().displayDrawer).toBe(true);
        wrapper.instance().handleHideDrawer();
        expect(wrapper.state().displayDrawer).toBe(false);
    });

    describe('logIn and logOut functions', () => {
        it('verifies that the logIn function updates the state correctly', () => {
            const wrapper = shallow(<App />);
            const instance = wrapper.instance();
            
            expect(wrapper.state().user.isLoggedIn).toBe(false);
            expect(wrapper.state().user.email).toBe('');
            
            instance.logIn('test@example.com', 'password123');
            
            expect(wrapper.state().user.isLoggedIn).toBe(true);
            expect(wrapper.state().user.email).toBe('test@example.com');
            expect(wrapper.state().user.password).toBe('password123');
        });

        it('verifies that the logOut function updates the state correctly', () => {
            const wrapper = shallow(<App />);
            const instance = wrapper.instance();
            
            // First log in
            instance.logIn('test@example.com', 'password123');
            expect(wrapper.state().user.isLoggedIn).toBe(true);
            
            // Then log out
            instance.logOut();
            expect(wrapper.state().user.isLoggedIn).toBe(false);
            expect(wrapper.state().user.email).toBe('');
            expect(wrapper.state().user.password).toBe('');
        });
    });

    describe('markNotificationAsRead function', () => {
        it('verifies that markNotificationAsRead removes the notification from state', () => {
            const wrapper = shallow(<App />);
            const instance = wrapper.instance();
            
            expect(wrapper.state().listNotifications.length).toBe(3);
            
            instance.markNotificationAsRead(1);
            
            expect(wrapper.state().listNotifications.length).toBe(2);
            expect(wrapper.state().listNotifications.find((n) => n.id === 1)).toBeUndefined();
        });

        it('verifies that markNotificationAsRead works with multiple notifications', () => {
            const wrapper = shallow(<App />);
            const instance = wrapper.instance();
            
            expect(wrapper.state().listNotifications.length).toBe(3);
            
            instance.markNotificationAsRead(2);
            expect(wrapper.state().listNotifications.length).toBe(2);
            expect(wrapper.state().listNotifications.find((n) => n.id === 2)).toBeUndefined();
            
            instance.markNotificationAsRead(3);
            expect(wrapper.state().listNotifications.length).toBe(1);
            expect(wrapper.state().listNotifications.find((n) => n.id === 3)).toBeUndefined();
        });
    });
});

describe('mapStateToProps', () => {
    it('returns the correct object from state', () => {
        const state = fromJS({
            isUserLoggedIn: true
        });

        expect(mapStateToProps({ uiReducer: state })).toEqual({
            isLoggedIn: true
        });
    });
});
