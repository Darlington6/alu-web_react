import getImmutableObject from './0-fromjs.js';
import { Map } from 'immutable';

describe('getImmutableObject', () => {
  it('should convert a plain object to an Immutable Map', () => {
    const object = {
      fear: true,
      smell: -1033575916.9145899,
      wall: false,
      thing: -914767132
    };

    const result = getImmutableObject(object);
    
    expect(Map.isMap(result)).toBe(true);
    expect(result.get('fear')).toBe(true);
    expect(result.get('smell')).toBe(-1033575916.9145899);
    expect(result.get('wall')).toBe(false);
    expect(result.get('thing')).toBe(-914767132);
  });

  it('should handle nested objects', () => {
    const object = {
      name: 'John',
      address: {
        street: '123 Main St',
        city: 'New York'
      }
    };

    const result = getImmutableObject(object);
    
    expect(Map.isMap(result)).toBe(true);
    expect(result.get('name')).toBe('John');
    expect(Map.isMap(result.get('address'))).toBe(true);
    expect(result.getIn(['address', 'street'])).toBe('123 Main St');
    expect(result.getIn(['address', 'city'])).toBe('New York');
  });
});
