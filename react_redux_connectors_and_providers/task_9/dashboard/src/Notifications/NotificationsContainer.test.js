import React from 'react';
import { shallow } from 'enzyme';
import { NotificationsContainer } from './NotificationsContainer';

describe('<NotificationsContainer />', () => {
  it('calls fetchNotifications when mounted', () => {
    const fetchNotificationsMock = jest.fn();
    const wrapper = shallow(
      <NotificationsContainer fetchNotifications={ fetchNotificationsMock } />
    );

    wrapper.instance().componentDidMount();
    expect(fetchNotificationsMock).toHaveBeenCalled();
  });
});
