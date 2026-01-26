import accessImmutableObject from './2-nested.js';
import { Map } from 'immutable';

describe('accessImmutableObject', () => {
  it('should return the value at the defined path', () => {
    const object = {
      name: {
        first: "Guillaume",
        last: "Salva"
      }
    };

    const result = accessImmutableObject(object, ['name', 'first']);
    expect(result).toBe("Guillaume");
  });

  it('should return the last name', () => {
    const object = {
      name: {
        first: "Guillaume",
        last: "Salva"
      }
    };

    const result = accessImmutableObject(object, ['name', 'last']);
    expect(result).toBe("Salva");
  });

  it('should return a Map for nested objects', () => {
    const object = {
      name: {
        first: "Guillaume",
        last: "Salva"
      }
    };

    const result = accessImmutableObject(object, ['name']);
    expect(Map.isMap(result)).toBe(true);
    expect(result.get('first')).toBe("Guillaume");
    expect(result.get('last')).toBe("Salva");
  });

  it('should return undefined for non-existent paths', () => {
    const object = {
      name: {
        first: "Guillaume",
        last: "Salva"
      }
    };

    const result = accessImmutableObject(object, ['name', 'middle']);
    expect(result).toBeUndefined();
  });

  it('should handle deeper nested paths', () => {
    const object = {
      user: {
        profile: {
          address: {
            city: "San Francisco"
          }
        }
      }
    };

    const result = accessImmutableObject(object, ['user', 'profile', 'address', 'city']);
    expect(result).toBe("San Francisco");
  });
});
