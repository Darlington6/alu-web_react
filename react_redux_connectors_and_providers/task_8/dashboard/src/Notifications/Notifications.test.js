import React from 'react';
import { shallow } from 'enzyme';
import { Notifications } from './Notifications';
import NotificationItem from './NotificationItem';
import { getLatestNotification } from '../utils/utils';
import { NotificationTypeFilters } from '../actions/notificationActionTypes';

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

    it('calls fetchNotifications when mounted', () => {
        const fetchNotificationsMock = jest.fn();
        const wrapper = shallow(
            <Notifications fetchNotifications={ fetchNotificationsMock } />
        );

        wrapper.instance().componentDidMount();
        expect(fetchNotificationsMock).toHaveBeenCalled();
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

    it('verifies that markNotificationAsRead is passed to NotificationItem', () => {
        const markNotificationAsReadMock = jest.fn();
        const wrapper = shallow(
            <Notifications 
                displayDrawer={ true } 
                listNotifications={ listNotifications }
                markNotificationAsRead={ markNotificationAsReadMock }
            />
        );
        const notificationItem = wrapper.find(NotificationItem).at(0);
        expect(notificationItem.prop('markAsRead')).toBe(markNotificationAsReadMock);
    });

    it('verifies clicking on the menu item calls handleDisplayDrawer', () => {
        const handleDisplayDrawerMock = jest.fn();
        const wrapper = shallow(<Notifications handleDisplayDrawer={ handleDisplayDrawerMock } />);
        wrapper.find('.menuItem').simulate('click');
        expect(handleDisplayDrawerMock).toHaveBeenCalled();
    });

    it('verifies clicking on the close button calls handleHideDrawer', () => {
        const handleHideDrawerMock = jest.fn();
        const wrapper = shallow(<Notifications displayDrawer={ true } handleHideDrawer={ handleHideDrawerMock } listNotifications={ listNotifications } />);
        wrapper.find('button').simulate('click');
        expect(handleHideDrawerMock).toHaveBeenCalled();
    });

    it('clicking on urgent button calls setNotificationFilter with URGENT', () => {
        const setNotificationFilterMock = jest.fn();
        const wrapper = shallow(
            <Notifications
                displayDrawer={ true }
                listNotifications={ listNotifications }
                setNotificationFilter={ setNotificationFilterMock }
            />
        );

        wrapper.find('.notificationFilter button').at(0).simulate('click');
        expect(setNotificationFilterMock).toHaveBeenCalledWith(NotificationTypeFilters.URGENT);
    });

    it('clicking on default button calls setNotificationFilter with DEFAULT', () => {
        const setNotificationFilterMock = jest.fn();
        const wrapper = shallow(
            <Notifications
                displayDrawer={ true }
                listNotifications={ listNotifications }
                setNotificationFilter={ setNotificationFilterMock }
            />
        );

        wrapper.find('.notificationFilter button').at(1).simulate('click');
        expect(setNotificationFilterMock).toHaveBeenCalledWith(NotificationTypeFilters.DEFAULT);
    });
});
