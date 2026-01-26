import { map, map2 } from './4-mutations.js';
import { Map } from 'immutable';

describe('Chained mutations', () => {
  describe('map', () => {
    it('should be an immutable Map', () => {
      expect(Map.isMap(map)).toBe(true);
    });

    it('should have the correct initial values', () => {
      expect(map.get('1')).toBe('Liam');
      expect(map.get('2')).toBe('Noah');
      expect(map.get('3')).toBe('Elijah');
      expect(map.get('4')).toBe('Oliver');
      expect(map.get('5')).toBe('Jacob');
      expect(map.get('6')).toBe('Lucas');
    });

    it('should have 6 entries', () => {
      expect(map.size).toBe(6);
    });
  });

  describe('map2', () => {
    it('should be an immutable Map', () => {
      expect(Map.isMap(map2)).toBe(true);
    });

    it('should have modified value at index 2', () => {
      expect(map2.get('2')).toBe('Benjamin');
    });

    it('should have value at index 4', () => {
      expect(map2.get('4')).toBe('Oliver');
    });

    it('should keep other values unchanged', () => {
      expect(map2.get('1')).toBe('Liam');
      expect(map2.get('3')).toBe('Elijah');
      expect(map2.get('5')).toBe('Jacob');
      expect(map2.get('6')).toBe('Lucas');
    });

    it('should not mutate the original map', () => {
      expect(map.get('2')).toBe('Noah');
      expect(map2.get('2')).toBe('Benjamin');
    });

    it('should have 6 entries', () => {
      expect(map2.size).toBe(6);
    });
  });
});
