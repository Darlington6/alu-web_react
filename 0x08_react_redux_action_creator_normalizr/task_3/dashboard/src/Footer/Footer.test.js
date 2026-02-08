import React from 'react';
import { mount } from 'enzyme';
import Footer from './Footer';
import AppContext, { defaultUser } from '../App/AppContext';

describe('<Footer />', () => {
    it('renders an <Footer /> component', () => {
        const contextValue = {
            user: defaultUser,
            logOut: () => {},
        };
        const wrapper = mount(
            <AppContext.Provider value={ contextValue }>
                <Footer />
            </AppContext.Provider>
        );
        expect(wrapper.find('.App-footer')).toHaveLength(1);
    });

    it('renders two paragraphs', () => {
        const contextValue = {
            user: defaultUser,
            logOut: () => {},
        };
        const wrapper = mount(
            <AppContext.Provider value={ contextValue }>
                <Footer />
            </AppContext.Provider>
        );
        expect(wrapper.find('p')).toHaveLength(1);
    });

    describe('with default context value (logged out)', () => {
        it('does not display the link "Contact us" when user is logged out', () => {
            const contextValue = {
                user: defaultUser,
                logOut: () => {},
            };
            const wrapper = mount(
                <AppContext.Provider value={ contextValue }>
                    <Footer />
                </AppContext.Provider>
            );
            expect(wrapper.find('a')).toHaveLength(0);
        });
    });

    describe('with logged in user context', () => {
        it('displays the link "Contact us" when user is logged in', () => {
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
                    <Footer />
                </AppContext.Provider>
            );
            const contactLink = wrapper.find('a');
            expect(contactLink).toHaveLength(1);
            expect(contactLink.text()).toBe('Contact us');
        });

        it('displays two paragraphs when user is logged in', () => {
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
                    <Footer />
                </AppContext.Provider>
            );
            expect(wrapper.find('p')).toHaveLength(2);
        });
    });
});
