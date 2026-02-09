import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  selectCourse,
  unSelectCourse,
  setCourses,
  fetchCourses
} from './courseActionCreators';
import {
  SELECT_COURSE,
  UNSELECT_COURSE,
  FETCH_COURSE_SUCCESS
} from './courseActionTypes';

jest.mock('node-fetch', () => fetchMock);

const mockStore = configureMockStore([thunk]);

describe('courseActionCreators', () => {
  it('selectCourse should return the correct action', () => {
    expect(selectCourse(1)).toEqual({ type: SELECT_COURSE, index: 1 });
  });

  it('unSelectCourse should return the correct action', () => {
    expect(unSelectCourse(1)).toEqual({ type: UNSELECT_COURSE, index: 1 });
  });

  it('setCourses should return the correct action', () => {
    const data = [{ id: 1, name: 'ES6', credit: 60 }];
    expect(setCourses(data)).toEqual({ type: FETCH_COURSE_SUCCESS, data });
  });

  describe('fetchCourses', () => {
    afterEach(() => {
      fetchMock.restore();
    });

    it('dispatches setCourses with fetched data', () => {
      const data = [{ id: 1, name: 'ES6', credit: 60 }];
      fetchMock.getOnce('/courses.json', {
        status: 200,
        body: data
      });

      const store = mockStore({});

      return store.dispatch(fetchCourses()).then(() => {
        expect(store.getActions()).toEqual([
          { type: FETCH_COURSE_SUCCESS, data }
        ]);
      });
    });
  });
});
