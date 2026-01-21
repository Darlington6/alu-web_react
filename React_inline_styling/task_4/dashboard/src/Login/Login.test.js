import React from 'react';
import { shallow } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';
import Login from './Login';

StyleSheetTestUtils.suppressStyleInjection();

describe('<Login />', () => {
    it('renders an <Login /> component checking for App-Login', () => {
        const wrapper = shallow(<Login />);
        expect(wrapper.find('div')).toHaveLength(2);
    });

    it('renders an <Login /> component checking for input', () => {
        const wrapper = shallow(<Login />);
        expect(wrapper.find('input')).toHaveLength(2);
    });

    it('renders an <Login /> component checking for label', () => {
        const wrapper = shallow(<Login />);
        expect(wrapper.find('label')).toHaveLength(2);
    });
});