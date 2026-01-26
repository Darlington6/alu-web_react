import mergeDeeplyElements from './6-deeply.js';
import { Map } from 'immutable';

describe('mergeDeeplyElements', () => {
  it('should deeply merge two objects', () => {
    const page1 = {
      'user-1': {
        id: 1,
        name: 'test',
        likes: {
          1: {
            uid: 1234,
          }
        }
      },
    };

    const page2 = {
      'user-1': {
        likes: {
          2: {
            uid: 134,
          }
        }
      },
    };

    const result = mergeDeeplyElements(page1, page2);
    
    expect(Map.isMap(result)).toBe(true);
    
    const resultJS = result.toJS();
    expect(resultJS['user-1'].id).toBe(1);
    expect(resultJS['user-1'].name).toBe('test');
    expect(resultJS['user-1'].likes['1'].uid).toBe(1234);
    expect(resultJS['user-1'].likes['2'].uid).toBe(134);
  });

  it('should preserve all nested properties', () => {
    const page1 = {
      'user-1': {
        id: 1,
        name: 'test',
        likes: {
          1: {
            uid: 1234,
          }
        }
      },
    };

    const page2 = {
      'user-1': {
        likes: {
          2: {
            uid: 134,
          }
        }
      },
    };

    const result = mergeDeeplyElements(page1, page2);
    const resultJS = result.toJS();

    expect(Object.keys(resultJS['user-1'].likes)).toEqual(['1', '2']);
  });

  it('should handle multiple users', () => {
    const page1 = {
      'user-1': {
        id: 1,
        name: 'Alice'
      },
      'user-2': {
        id: 2,
        name: 'Bob'
      }
    };

    const page2 = {
      'user-1': {
        age: 25
      },
      'user-3': {
        id: 3,
        name: 'Charlie'
      }
    };

    const result = mergeDeeplyElements(page1, page2);
    const resultJS = result.toJS();

    expect(resultJS['user-1'].id).toBe(1);
    expect(resultJS['user-1'].name).toBe('Alice');
    expect(resultJS['user-1'].age).toBe(25);
    expect(resultJS['user-2'].name).toBe('Bob');
    expect(resultJS['user-3'].name).toBe('Charlie');
  });

  it('should override values at the same path', () => {
    const page1 = {
      user: {
        name: 'John',
        age: 30
      }
    };

    const page2 = {
      user: {
        age: 31
      }
    };

    const result = mergeDeeplyElements(page1, page2);
    const resultJS = result.toJS();

    expect(resultJS.user.name).toBe('John');
    expect(resultJS.user.age).toBe(31);
  });
});
