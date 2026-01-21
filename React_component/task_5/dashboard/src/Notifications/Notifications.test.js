import React from 'react';
import { shallow } from 'enzyme';
import Notifications from './Notifications';
import NotificationItem from './NotificationItem';
import { getLatestNotification } from '../utils/utils';

const htmlObj = getLatestNotification();

const listNotifications = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', html: htmlObj },
];

describe('<Notifications />', () => {
    it('renders an <Notifications /> component', () => {
        const wrapper = shallow(<Notifications />);
        expect(wrapper).toHaveLength(1);
    });

    it('does display the menuItem when displayDrawer is false', () => {
        const wrapper = shallow(<Notifications displayDrawer={ false } />);
        expect(wrapper.find('.menuItem')).toHaveLength(1);
    });

    it('does not display div.Notifications when displayDrawer is false', () => {
        const wrapper = shallow(<Notifications displayDrawer={ false } />);
        expect(wrapper.find('.Notifications')).toHaveLength(0);
    });

    it('does display the menuItem when displayDrawer is true', () => {
        const wrapper = shallow(<Notifications displayDrawer={ true } />);
        expect(wrapper.find('.menuItem')).toHaveLength(1);
    });

    it('does not display div.Notifications when displayDrawer is true', () => {
        const wrapper = shallow(<Notifications displayDrawer={ true } />);
        expect(wrapper.find('.Notifications')).toHaveLength(1);
    });

    it('renders an <Notifications /> component checking for 3 NotificationItems', () => {
        const wrapper = shallow(<Notifications displayDrawer={ true } listNotifications={ listNotifications } />);
        expect(wrapper.find('.Notifications ul NotificationItem')).toHaveLength(3);
    });

    it('verifies that the first NotificationItem element renders the html', () => {
        const wrapper = shallow(<Notifications displayDrawer={ true } listNotifications={ listNotifications } />);
        expect(wrapper.html()).toContain('<li data-notification-type="default">New course available</li>');
    });

    it('verifies that Notifications renders correctly if you pass an empty array or without the listNotifications prop', () => {
        const wrapper = shallow(<Notifications displayDrawer={ true } />);
        expect(wrapper.find('.Notifications')).toHaveLength(1);
        const wrapperTwo = shallow(<Notifications displayDrawer={ true } listNotifications={ [] } />);
        expect(wrapper.find('.Notifications')).toHaveLength(1);
    });

    it('verifies that when you pass a list of notifications, the component renders it correctly and with the right number of NotificationItem', () => {
        const wrapper = shallow(<Notifications displayDrawer={ true } listNotifications={ listNotifications } />);
        expect(wrapper.find(NotificationItem)).toHaveLength(3);
    });

    it('verifies that Notifications renders correctly if you pass an empty array or without the listNotifications prop', () => {
        const wrapper = shallow(<Notifications displayDrawer={ true } />);
        expect(wrapper.find('.Notifications p').text()).not.toEqual('Here is the list of notifications');
        expect(wrapper.find('.Notifications p').text()).toEqual('No new notification for now');
    });

    it('calls markAsRead and logs the right message', () => {
        const wrapper = shallow(<Notifications displayDrawer={ true } />);
        const instance = wrapper.instance();
        const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
        instance.markAsRead(42);
        expect(spy).toHaveBeenCalledWith('Notification 42 has been marked as read');
        spy.mockRestore();
    });

    it('does not rerender when updating the props with the same list', () => {
        const wrapper = shallow(<Notifications displayDrawer={ true } listNotifications={ listNotifications } />);
        const shouldUpdate = wrapper.instance().shouldComponentUpdate({ 
            displayDrawer: true, 
            listNotifications: listNotifications 
        });
        expect(shouldUpdate).toBe(false);
    });

    it('does rerender when updating the props with a longer list', () => {
        const wrapper = shallow(<Notifications displayDrawer={ true } listNotifications={ listNotifications } />);
        const longerList = [
            ...listNotifications,
            { id: 4, type: 'default', value: 'New notification' }
        ];
        const shouldUpdate = wrapper.instance().shouldComponentUpdate({ 
            displayDrawer: true, 
            listNotifications: longerList 
        });
        expect(shouldUpdate).toBe(true);
    });
});