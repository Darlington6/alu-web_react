import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App component', () => {
  test('App renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toBe(true);
  });

  test('App renders a div with the class App-header', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('.App-header')).toHaveLength(1);
  });

  test('App renders a div with the class App-body', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('.App-body')).toHaveLength(1);
  });

  test('App renders a div with the class App-footer', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('.App-footer')).toHaveLength(1);
  });
});