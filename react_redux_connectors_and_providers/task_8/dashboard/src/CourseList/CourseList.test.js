import React from 'react';
import { shallow } from 'enzyme';
import { List, fromJS } from 'immutable';
import { CourseList } from './CourseList';

describe('<CourseList />', () => {
  it('calls fetchCourses when mounted', () => {
    const fetchCoursesMock = jest.fn();
    const wrapper = shallow(
      <CourseList listCourses={ List() } fetchCourses={ fetchCoursesMock } />
    );

    wrapper.instance().componentDidMount();
    expect(fetchCoursesMock).toHaveBeenCalled();
  });

  it('dispatches selectCourse or unSelectCourse from onChangeRow', () => {
    const selectCourseMock = jest.fn();
    const unSelectCourseMock = jest.fn();
    const listCourses = fromJS([
      { id: '1', name: 'ES6', credit: 60, isSelected: false }
    ]);

    const wrapper = shallow(
      <CourseList
        listCourses={ listCourses }
        selectCourse={ selectCourseMock }
        unSelectCourse={ unSelectCourseMock }
      />
    );

    wrapper.instance().onChangeRow('1', true);
    expect(selectCourseMock).toHaveBeenCalledWith('1');

    wrapper.instance().onChangeRow('1', false);
    expect(unSelectCourseMock).toHaveBeenCalledWith('1');
  });
});
