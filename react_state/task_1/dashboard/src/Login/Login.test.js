import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';

describe('<Login />', () => {
    it('renders an <Login /> component', () => {
        const wrapper = shallow(<Login />);
        expect(wrapper).toHaveLength(1);
    });

    it('renders a form element', () => {
        const wrapper = shallow(<Login />);
        expect(wrapper.find('form')).toHaveLength(1);
    });

    it('renders email and password input elements', () => {
        const wrapper = shallow(<Login />);
        expect(wrapper.find('input[type="email"]')).toHaveLength(1);
        expect(wrapper.find('input[type="password"]')).toHaveLength(1);
    });

    it('renders a submit input element', () => {
        const wrapper = shallow(<Login />);
        expect(wrapper.find('input[type="submit"]')).toHaveLength(1);
    });

    describe('submit button disabled/enabled state', () => {
        it('verifies that the submit button is disabled by default', () => {
            const wrapper = shallow(<Login />);
            const submitButton = wrapper.find('input[type="submit"]');
            expect(submitButton.prop('disabled')).toBe(true);
        });

        it('verifies that the submit button is disabled when email is empty', () => {
            const wrapper = shallow(<Login />);
            const passwordInput = wrapper.find('input[type="password"]');
            passwordInput.simulate('change', { target: { value: 'password123' } });
            
            wrapper.update();
            const submitButton = wrapper.find('input[type="submit"]');
            expect(submitButton.prop('disabled')).toBe(true);
        });

        it('verifies that the submit button is disabled when password is empty', () => {
            const wrapper = shallow(<Login />);
            const emailInput = wrapper.find('input[type="email"]');
            emailInput.simulate('change', { target: { value: 'test@example.com' } });
            
            wrapper.update();
            const submitButton = wrapper.find('input[type="submit"]');
            expect(submitButton.prop('disabled')).toBe(true);
        });

        it('verifies that the submit button is enabled when both email and password are not empty', () => {
            const wrapper = shallow(<Login />);
            const emailInput = wrapper.find('input[type="email"]');
            const passwordInput = wrapper.find('input[type="password"]');
            
            emailInput.simulate('change', { target: { value: 'test@example.com' } });
            passwordInput.simulate('change', { target: { value: 'password123' } });
            
            wrapper.update();
            const submitButton = wrapper.find('input[type="submit"]');
            expect(submitButton.prop('disabled')).toBe(false);
        });
    });

    describe('form submission and input changes', () => {
        it('verifies that the form submission does not reload the page', () => {
            const wrapper = shallow(<Login />);
            const form = wrapper.find('form');
            const mockEvent = { preventDefault: jest.fn() };
            form.simulate('submit', mockEvent);
            expect(mockEvent.preventDefault).toHaveBeenCalled();
        });

        it('verifies that isLoggedIn state is updated to true when form is submitted', () => {
            const wrapper = shallow(<Login />);
            const instance = wrapper.instance();
            instance.setState({ email: 'test@example.com', password: 'password123' });
            
            const form = wrapper.find('form');
            const mockEvent = { preventDefault: jest.fn() };
            form.simulate('submit', mockEvent);
            
            expect(instance.state.isLoggedIn).toBe(true);
        });

        it('verifies that changing the email input updates the state', () => {
            const wrapper = shallow(<Login />);
            const emailInput = wrapper.find('input[type="email"]');
            emailInput.simulate('change', { target: { value: 'newemail@example.com' } });
            
            expect(wrapper.instance().state.email).toBe('newemail@example.com');
        });

        it('verifies that changing the password input updates the state', () => {
            const wrapper = shallow(<Login />);
            const passwordInput = wrapper.find('input[type="password"]');
            passwordInput.simulate('change', { target: { value: 'newpassword' } });
            
            expect(wrapper.instance().state.password).toBe('newpassword');
        });

        it('verifies that after changing both input values, the button is enabled', () => {
            const wrapper = shallow(<Login />);
            const emailInput = wrapper.find('input[type="email"]');
            const passwordInput = wrapper.find('input[type="password"]');
            
            emailInput.simulate('change', { target: { value: 'test@example.com' } });
            passwordInput.simulate('change', { target: { value: 'password123' } });
            
            wrapper.update();
            const submitButton = wrapper.find('input[type="submit"]');
            expect(submitButton.prop('disabled')).toBe(false);
        });

        it('verifies that if email is cleared, the button becomes disabled', () => {
            const wrapper = shallow(<Login />);
            const emailInput = wrapper.find('input[type="email"]');
            const passwordInput = wrapper.find('input[type="password"]');
            
            emailInput.simulate('change', { target: { value: 'test@example.com' } });
            passwordInput.simulate('change', { target: { value: 'password123' } });
            
            wrapper.update();
            
            emailInput.simulate('change', { target: { value: '' } });
            wrapper.update();
            
            const submitButton = wrapper.find('input[type="submit"]');
            expect(submitButton.prop('disabled')).toBe(true);
        });

        it('verifies that if password is cleared, the button becomes disabled', () => {
            const wrapper = shallow(<Login />);
            const emailInput = wrapper.find('input[type="email"]');
            const passwordInput = wrapper.find('input[type="password"]');
            
            emailInput.simulate('change', { target: { value: 'test@example.com' } });
            passwordInput.simulate('change', { target: { value: 'password123' } });
            
            wrapper.update();
            
            passwordInput.simulate('change', { target: { value: '' } });
            wrapper.update();
            
            const submitButton = wrapper.find('input[type="submit"]');
            expect(submitButton.prop('disabled')).toBe(true);
        });

        it('verifies that the input values are controlled by state', () => {
            const wrapper = shallow(<Login />);
            const instance = wrapper.instance();
            instance.setState({ email: 'controlled@example.com', password: 'controlledpass' });
            
            wrapper.update();
            
            const emailInput = wrapper.find('input[type="email"]');
            const passwordInput = wrapper.find('input[type="password"]');
            
            expect(emailInput.prop('value')).toBe('controlled@example.com');
            expect(passwordInput.prop('value')).toBe('controlledpass');
        });
    });
});
