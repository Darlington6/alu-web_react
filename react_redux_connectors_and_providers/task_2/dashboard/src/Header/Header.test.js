import React from 'react';
import { shallow } from 'enzyme';
import { Header } from './Header';

describe('<Header />', () => {
    it('renders an <Header /> component', () => {
        const wrapper = shallow(<Header />);
        expect(wrapper.find('.App-header')).toHaveLength(1);
    });

    it('renders the logo image', () => {
        const wrapper = shallow(<Header />);
        expect(wrapper.find('img').exists()).toBe(true);
        expect(wrapper.find('img').prop('src')).toContain('holberton-logo');
    });

    it('renders the title "School dashboard"', () => {
        const wrapper = shallow(<Header />);
        expect(wrapper.find('h1').text()).toBe('School dashboard');
    });

    describe('with default context value', () => {
        it('does not display the logoutSection when user is not logged in', () => {
            const wrapper = shallow(<Header user={ { isLoggedIn: false } } />);
            expect(wrapper.find('#logoutSection')).toHaveLength(0);
        });
    });

    describe('with logged in user context', () => {
        it('displays the logoutSection when user is logged in', () => {
            const loggedInUser = {
                email: 'test@example.com',
                isLoggedIn: true,
            };
            const wrapper = shallow(<Header user={ loggedInUser } />);
            expect(wrapper.find('#logoutSection')).toHaveLength(1);
        });

        it('displays the user email in the logout section', () => {
            const loggedInUser = {
                email: 'test@example.com',
                isLoggedIn: true,
            };
            const wrapper = shallow(<Header user={ loggedInUser } />);
            const logoutSection = wrapper.find('#logoutSection');
            expect(logoutSection.text()).toContain('test@example.com');
        });
    });
});




