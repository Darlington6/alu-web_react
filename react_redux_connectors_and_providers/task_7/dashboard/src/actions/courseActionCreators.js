import { bindActionCreators } from 'redux';
import fetch from 'node-fetch';
import {
  SELECT_COURSE,
  UNSELECT_COURSE,
  FETCH_COURSE_SUCCESS
} from './courseActionTypes';

export const selectCourse = (index) => ({
  type: SELECT_COURSE,
  index
});

export const unSelectCourse = (index) => ({
  type: UNSELECT_COURSE,
  index
});

export const setCourses = (data) => ({
  type: FETCH_COURSE_SUCCESS,
  data
});

export const fetchCourses = () => {
  return (dispatch) =>
    fetch('/courses.json')
      .then((response) => response.json())
      .then((data) => dispatch(setCourses(data)))
      .catch(() => {});
};

export const boundSelectCourse = (dispatch) =>
  bindActionCreators(selectCourse, dispatch);

export const boundUnSelectCourse = (dispatch) =>
  bindActionCreators(unSelectCourse, dispatch);
