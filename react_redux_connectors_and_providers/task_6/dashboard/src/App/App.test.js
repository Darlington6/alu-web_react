import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { App, mapStateToProps } from './App';
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

    it('wraps Login inside BodySectionWithMarginBottom when logged out', () => {
        const wrapper = shallow(<App isLoggedIn={ false } />);
        const sections = wrapper.find(BodySectionWithMarginBottom);
        expect(sections).toHaveLength(1);
        expect(sections.at(0).props().title).toEqual('Log in to continue');
        expect(sections.at(0).find(Login)).toHaveLength(1);
    });

    it('wraps CourseList inside BodySectionWithMarginBottom when logged in', () => {
        const wrapper = shallow(<App isLoggedIn={ true } />);
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

});

describe('mapStateToProps', () => {
    it('returns the correct object from state', () => {
        const state = fromJS({
            isUserLoggedIn: true,
            isNotificationDrawerVisible: true
        });

        expect(mapStateToProps({ ui: state })).toEqual({
            isLoggedIn: true,
            displayDrawer: true
        });
    });
});
