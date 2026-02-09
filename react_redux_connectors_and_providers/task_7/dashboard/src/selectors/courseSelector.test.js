import { fromJS, List } from 'immutable';
import { getListCourses } from './courseSelector';

describe('getListCourses', () => {
  it('returns a list of courses from the reducer', () => {
    const state = fromJS({
      courses: {
        1: { id: 1, name: 'ES6', credit: 60 },
        2: { id: 2, name: 'Webpack', credit: 20 },
        3: { id: 3, name: 'React', credit: 40 }
      }
    });

    const result = getListCourses(state);

    expect(List.isList(result)).toBe(true);
    expect(result.toJS()).toEqual([
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 }
    ]);
  });

  it('returns an empty array when no courses', () => {
    const state = fromJS({});

    expect(getListCourses(state)).toEqual([]);
  });
});
