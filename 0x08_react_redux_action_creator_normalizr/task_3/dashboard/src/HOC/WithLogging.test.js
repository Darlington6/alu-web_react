import React from 'react';
import { shallow } from 'enzyme';
import WithLogging from './WithLogging';
import Login from '../Login/Login';

describe('WithLogging HOC', () => {
    let consoleSpy;

    beforeEach(() => {
        consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });

    it('logs on mount and unmount with Component for pure HTML', () => {
        const Wrapped = WithLogging(() => <p />);
        const wrapper = shallow(<Wrapped />, { disableLifecycleMethods: false });
        wrapper.unmount();
        expect(consoleSpy).toHaveBeenCalledWith('Component Component is mounted');
        expect(consoleSpy).toHaveBeenCalledWith('Component Component is going to unmount');
    });

    it('logs on mount and unmount with component name when wrapping Login', () => {
        const Wrapped = WithLogging(Login);
        const wrapper = shallow(<Wrapped />, { disableLifecycleMethods: false });
        wrapper.unmount();
        expect(consoleSpy).toHaveBeenCalledWith('Component Login is mounted');
        expect(consoleSpy).toHaveBeenCalledWith('Component Login is going to unmount');
    });
});
