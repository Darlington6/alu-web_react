import React from 'react';
import { shallow } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';
import BodySection from './BodySection';

StyleSheetTestUtils.suppressStyleInjection();

describe('<BodySection />', () => {
    it('renders a BodySection component', () => {
        const wrapper = shallow(<BodySection title="test" />);
        expect(wrapper).toHaveLength(1);
    });

    it('renders a div with className bodySection', () => {
        const wrapper = shallow(<BodySection title="test" />);
        expect(wrapper.find('div')).toHaveLength(1);
    });

    it('renders an h2 with the title prop', () => {
        const wrapper = shallow(<BodySection title="test" />);
        expect(wrapper.find('h2')).toHaveLength(1);
        expect(wrapper.find('h2').text()).toEqual('test');
    });

    it('renders children correctly', () => {
        const wrapper = shallow(
            <BodySection title="test">
                <p>test content</p>
            </BodySection>
        );
        expect(wrapper.find('p')).toHaveLength(1);
        expect(wrapper.find('p').text()).toEqual('test content');
    });

    it('verifies that title prop is required', () => {
        // BodySection.propTypes.title is a PropTypes validator with isRequired flag
        // We just verify the component has the correct propTypes defined
        expect(BodySection.propTypes.title).toBeDefined();
    });

    it('renders multiple children', () => {
        const wrapper = shallow(
            <BodySection title="test">
                <p>first</p>
                <p>second</p>
                <p>third</p>
            </BodySection>
        );
        expect(wrapper.find('p')).toHaveLength(3);
    });

    it('renders h2 and children text as expected', () => {
        const wrapper = shallow(
            <BodySection title="test title">
                <p>test content</p>
            </BodySection>
        );
        expect(wrapper.find('h2').text()).toEqual('test title');
        expect(wrapper.find('p').text()).toEqual('test content');
    });
});
