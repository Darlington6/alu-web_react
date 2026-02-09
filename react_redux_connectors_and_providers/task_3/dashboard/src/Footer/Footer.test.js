import React from 'react';
import { shallow } from 'enzyme';
import { Footer } from './Footer';

describe('<Footer />', () => {
    it('renders an <Footer /> component', () => {
        const wrapper = shallow(<Footer />);
        expect(wrapper.find('.App-footer')).toHaveLength(1);
    });

    it('renders two paragraphs', () => {
        const wrapper = shallow(<Footer />);
        expect(wrapper.find('p')).toHaveLength(1);
    });

    describe('with default context value (logged out)', () => {
        it('does not display the link "Contact us" when user is logged out', () => {
            const wrapper = shallow(<Footer user={ { isLoggedIn: false } } />);
            expect(wrapper.find('a')).toHaveLength(0);
        });
    });

    describe('with logged in user context', () => {
        it('displays the link "Contact us" when user is logged in', () => {
            const loggedInUser = {
                email: 'test@example.com',
                isLoggedIn: true,
            };
            const wrapper = shallow(<Footer user={ loggedInUser } />);
            const contactLink = wrapper.find('a');
            expect(contactLink).toHaveLength(1);
            expect(contactLink.text()).toBe('Contact us');
        });

        it('displays two paragraphs when user is logged in', () => {
            const loggedInUser = {
                email: 'test@example.com',
                isLoggedIn: true,
            };
            const wrapper = shallow(<Footer user={ loggedInUser } />);
            expect(wrapper.find('p')).toHaveLength(2);
        });
    });
});
