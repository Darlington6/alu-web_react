import { getListObject, addElementToList } from './3-list.js';
import { List } from 'immutable';

describe('List functions', () => {
  describe('getListObject', () => {
    it('should convert an array to an immutable List', () => {
      const array = ['apple', 'banana', 'orange'];
      const result = getListObject(array);
      
      expect(List.isList(result)).toBe(true);
      expect(result.size).toBe(3);
      expect(result.get(0)).toBe('apple');
      expect(result.get(1)).toBe('banana');
      expect(result.get(2)).toBe('orange');
    });

    it('should handle empty arrays', () => {
      const array = [];
      const result = getListObject(array);
      
      expect(List.isList(result)).toBe(true);
      expect(result.size).toBe(0);
    });

    it('should convert array of numbers', () => {
      const array = [1, 2, 3, 4, 5];
      const result = getListObject(array);
      
      expect(List.isList(result)).toBe(true);
      expect(result.toJS()).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe('addElementToList', () => {
    it('should append an element to the list', () => {
      const list = List(['apple', 'banana']);
      const result = addElementToList(list, 'orange');
      
      expect(List.isList(result)).toBe(true);
      expect(result.size).toBe(3);
      expect(result.get(2)).toBe('orange');
    });

    it('should not mutate the original list', () => {
      const list = List(['apple', 'banana']);
      const result = addElementToList(list, 'orange');
      
      expect(list.size).toBe(2);
      expect(result.size).toBe(3);
    });

    it('should add element to empty list', () => {
      const list = List();
      const result = addElementToList(list, 'first');
      
      expect(result.size).toBe(1);
      expect(result.get(0)).toBe('first');
    });

    it('should handle multiple additions', () => {
      let list = List(['a']);
      list = addElementToList(list, 'b');
      list = addElementToList(list, 'c');
      
      expect(list.size).toBe(3);
      expect(list.toJS()).toEqual(['a', 'b', 'c']);
    });
  });
});
