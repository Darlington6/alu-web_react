import courseReducer from './courseReducer';
import {
  FETCH_COURSE_SUCCESS,
  SELECT_COURSE,
  UNSELECT_COURSE
} from '../actions/courseActionTypes';

describe('courseReducer', () => {
  const courses = [
    { id: 1, name: 'ES6', credit: 60 },
    { id: 2, name: 'Webpack', credit: 20 },
    { id: 3, name: 'React', credit: 40 }
  ];

  it('returns default state as an empty array', () => {
    expect(courseReducer(undefined, {})).toEqual([]);
  });

  it('returns data passed with FETCH_COURSE_SUCCESS', () => {
    const result = courseReducer(undefined, {
      type: FETCH_COURSE_SUCCESS,
      data: courses
    });

    expect(result).toEqual([
      { id: 1, name: 'ES6', isSelected: false, credit: 60 },
      { id: 2, name: 'Webpack', isSelected: false, credit: 20 },
      { id: 3, name: 'React', isSelected: false, credit: 40 }
    ]);
  });

  it('returns data with correct item selected', () => {
    const state = courseReducer(undefined, {
      type: FETCH_COURSE_SUCCESS,
      data: courses
    });

    const result = courseReducer(state, { type: SELECT_COURSE, index: 2 });

    expect(result).toEqual([
      { id: 1, name: 'ES6', isSelected: false, credit: 60 },
      { id: 2, name: 'Webpack', isSelected: true, credit: 20 },
      { id: 3, name: 'React', isSelected: false, credit: 40 }
    ]);
  });

  it('returns data with correct item unselected', () => {
    const state = courseReducer(undefined, {
      type: FETCH_COURSE_SUCCESS,
      data: courses
    });

    const selectedState = courseReducer(state, {
      type: SELECT_COURSE,
      index: 2
    });

    const result = courseReducer(selectedState, {
      type: UNSELECT_COURSE,
      index: 2
    });

    expect(result).toEqual([
      { id: 1, name: 'ES6', isSelected: false, credit: 60 },
      { id: 2, name: 'Webpack', isSelected: false, credit: 20 },
      { id: 3, name: 'React', isSelected: false, credit: 40 }
    ]);
  });
});
