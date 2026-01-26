import areMapsEqual from './7-equality.js';
import { Map } from 'immutable';

describe('areMapsEqual', () => {
  it('should return true for equal maps', () => {
    const map1 = Map({
      firstName: 'Guillaume',
      lastName: 'Salva',
    });
    const map2 = Map({
      firstName: 'Guillaume',
      lastName: 'Salva',
    });

    expect(areMapsEqual(map1, map2)).toBe(true);
  });

  it('should return false for different maps', () => {
    const map1 = Map({
      firstName: 'Guillaume',
      lastName: 'Salva',
    });
    const map2 = Map({
      firstName: 'John',
      lastName: 'Doe',
    });

    expect(areMapsEqual(map1, map2)).toBe(false);
  });

  it('should return false for maps with different keys', () => {
    const map1 = Map({
      firstName: 'Guillaume',
      lastName: 'Salva',
    });
    const map2 = Map({
      firstName: 'Guillaume',
      middleName: 'Salva',
    });

    expect(areMapsEqual(map1, map2)).toBe(false);
  });

  it('should return true for the same map reference', () => {
    const map1 = Map({
      firstName: 'Guillaume',
      lastName: 'Salva',
    });

    expect(areMapsEqual(map1, map1)).toBe(true);
  });

  it('should return true for empty maps', () => {
    const map1 = Map();
    const map2 = Map();

    expect(areMapsEqual(map1, map2)).toBe(true);
  });

  it('should return false when one map has more entries', () => {
    const map1 = Map({
      firstName: 'Guillaume',
    });
    const map2 = Map({
      firstName: 'Guillaume',
      lastName: 'Salva',
    });

    expect(areMapsEqual(map1, map2)).toBe(false);
  });

  it('should handle nested maps correctly', () => {
    const map1 = Map({
      user: Map({
        name: 'Guillaume',
        age: 30,
      }),
    });
    const map2 = Map({
      user: Map({
        name: 'Guillaume',
        age: 30,
      }),
    });

    expect(areMapsEqual(map1, map2)).toBe(true);
  });

  it('should return false for different nested maps', () => {
    const map1 = Map({
      user: Map({
        name: 'Guillaume',
        age: 30,
      }),
    });
    const map2 = Map({
      user: Map({
        name: 'Guillaume',
        age: 31,
      }),
    });

    expect(areMapsEqual(map1, map2)).toBe(false);
  });
});
