import React from 'react';
import { mount } from 'enzyme';
import Header from './Header';
import AppContext, { defaultUser } from '../App/AppContext';

describe('<Header />', () => {
    it('renders an <Header /> component', () => {
        const contextValue = {
            user: defaultUser,
            logOut: () => {},
        };
        const wrapper = mount(
            <AppContext.Provider value={ contextValue }>
                <Header />
            </AppContext.Provider>
        );
        expect(wrapper.find('.App-header')).toHaveLength(1);
    });

    it('renders the logo image', () => {
        const contextValue = {
            user: defaultUser,
            logOut: () => {},
        };
        const wrapper = mount(
            <AppContext.Provider value={ contextValue }>
                <Header />
            </AppContext.Provider>
        );
        expect(wrapper.find('img').exists()).toBe(true);
        expect(wrapper.find('img').prop('src')).toContain('holberton-logo');
    });

    it('renders the title "School dashboard"', () => {
        const contextValue = {
            user: defaultUser,
            logOut: () => {},
        };
        const wrapper = mount(
            <AppContext.Provider value={ contextValue }>
                <Header />
            </AppContext.Provider>
        );
        expect(wrapper.find('h1').text()).toBe('School dashboard');
    });

    describe('with default context value', () => {
        it('does not display the logoutSection when user is not logged in', () => {
            const contextValue = {
                user: defaultUser,
                logOut: () => {},
            };
            const wrapper = mount(
                <AppContext.Provider value={ contextValue }>
                    <Header />
                </AppContext.Provider>
            );
            expect(wrapper.find('#logoutSection')).toHaveLength(0);
        });
    });

    describe('with logged in user context', () => {
        it('displays the logoutSection when user is logged in', () => {
            const loggedInUser = {
                email: 'test@example.com',
                password: 'password',
                isLoggedIn: true,
            };
            const contextValue = {
                user: loggedInUser,
                logOut: () => {},
            };
            const wrapper = mount(
                <AppContext.Provider value={ contextValue }>
                    <Header />
                </AppContext.Provider>
            );
            expect(wrapper.find('#logoutSection')).toHaveLength(1);
        });

        it('displays the user email in the logout section', () => {
            const loggedInUser = {
                email: 'test@example.com',
                password: 'password',
                isLoggedIn: true,
            };
            const contextValue = {
                user: loggedInUser,
                logOut: () => {},
            };
            const wrapper = mount(
                <AppContext.Provider value={ contextValue }>
                    <Header />
                </AppContext.Provider>
            );
            const logoutSection = wrapper.find('#logoutSection');
            expect(logoutSection.text()).toContain('test@example.com');
        });

        it('calls logOut when clicking on the logout link', () => {
            const logOutMock = jest.fn();
            const loggedInUser = {
                email: 'test@example.com',
                password: 'password',
                isLoggedIn: true,
            };
            const contextValue = {
                user: loggedInUser,
                logOut: logOutMock,
            };
            const wrapper = mount(
                <AppContext.Provider value={ contextValue }>
                    <Header />
                </AppContext.Provider>
            );
            const logoutLink = wrapper.find('#logoutSection a');
            logoutLink.simulate('click');
            expect(logOutMock).toHaveBeenCalled();
        });
    });
});




