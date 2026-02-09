import { Map, fromJS } from 'immutable';
import {
  FETCH_COURSE_SUCCESS,
  SELECT_COURSE,
  UNSELECT_COURSE
} from '../actions/courseActionTypes';
import { coursesNormalizer } from '../schema/courses';

const initialState = Map();

const courseReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_COURSE_SUCCESS: {
      const normalized = coursesNormalizer(action.data);
      const courses = Object.keys(normalized.entities.courses || {}).reduce(
        (acc, id) => {
          acc[id] = {
            ...normalized.entities.courses[id],
            isSelected: false
          };
          return acc;
        },
        {}
      );

      return state.merge(fromJS({ courses }));
    }
    case SELECT_COURSE:
      return state.setIn(['courses', String(action.index), 'isSelected'], true);
    case UNSELECT_COURSE:
      return state.setIn(
        ['courses', String(action.index), 'isSelected'],
        false
      );
    default:
      return state;
  }
};

export default courseReducer;
export { initialState };
