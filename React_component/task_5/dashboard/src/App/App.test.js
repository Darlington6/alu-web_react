import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
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

    // When isLoggedIn is true or user is logged into app
    it('verifies that the Login component is not included.', () => {
        const wrapper = shallow(<App isLoggedIn={ true } />);
        expect(wrapper.find(Login)).toHaveLength(0);
    });

    it('verifies that the Login component is not included.', () => {
        const wrapper = shallow(<App isLoggedIn={ true } />);
        expect(wrapper.find(CourseList)).toHaveLength(1);
    });

    it('wraps Login inside BodySectionWithMarginBottom when logged out', () => {
        const wrapper = shallow(<App />);
        const sections = wrapper.find(BodySectionWithMarginBottom);
        expect(sections).toHaveLength(1);
        expect(sections.at(0).props().title).toEqual('Log in to continue');
        expect(sections.at(0).find(Login)).toHaveLength(1);
    });

    it('wraps CourseList inside BodySectionWithMarginBottom when logged in', () => {
        const wrapper = shallow(<App isLoggedIn />);
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
            const logOutMock = jest.fn();
            const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
            
            const wrapper = shallow(<App logOut={logOutMock} />);
            const instance = wrapper.instance();
            
            const event = new KeyboardEvent('keydown', {
                ctrlKey: true,
                key: 'h',
            });
            
            instance.handleKeyDown(event);
            
            expect(alertMock).toHaveBeenCalledWith('Logging you out');
            expect(logOutMock).toHaveBeenCalled();
            
            alertMock.mockRestore();
        });
    });
});