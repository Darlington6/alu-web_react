import getImmutableObject from './1-map.js';
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
    expect(result.size).toBe(4);
  });

  it('should return a Map with the correct structure', () => {
    const object = {
      fear: true,
      smell: -1033575916.9145899,
      wall: false,
      thing: -914767132
    };

    const result = getImmutableObject(object);
    
    expect(result.toJS()).toEqual(object);
  });
});
