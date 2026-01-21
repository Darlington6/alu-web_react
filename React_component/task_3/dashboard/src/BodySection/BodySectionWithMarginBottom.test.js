import React from 'react';
import { shallow } from 'enzyme';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';
import BodySection from './BodySection';

describe('<BodySectionWithMarginBottom />', () => {
    it('renders BodySection with passed props', () => {
        const wrapper = shallow(
            <BodySectionWithMarginBottom title="test title">
                <p>test children node</p>
            </BodySectionWithMarginBottom>
        );
        const bodySection = wrapper.find(BodySection);
        expect(bodySection).toHaveLength(1);
        expect(bodySection.props().title).toEqual('test title');
        expect(bodySection.dive().find('p').text()).toEqual('test children node');
    });
});
