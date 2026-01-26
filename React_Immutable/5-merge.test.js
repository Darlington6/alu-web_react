import { concatElements, mergeElements } from './5-merge.js';
import { List, Map } from 'immutable';

describe('Merge & Concat', () => {
  describe('concatElements', () => {
    it('should concatenate two arrays into a List', () => {
      const page1 = ['a', 'b', 'c'];
      const page2 = ['d', 'e', 'f'];
      const result = concatElements(page1, page2);
      
      expect(List.isList(result)).toBe(true);
      expect(result.size).toBe(6);
      expect(result.toJS()).toEqual(['a', 'b', 'c', 'd', 'e', 'f']);
    });

    it('should handle empty arrays', () => {
      const page1 = ['a', 'b'];
      const page2 = [];
      const result = concatElements(page1, page2);
      
      expect(List.isList(result)).toBe(true);
      expect(result.size).toBe(2);
      expect(result.toJS()).toEqual(['a', 'b']);
    });

    it('should concatenate arrays with different types', () => {
      const page1 = [1, 2, 3];
      const page2 = ['a', 'b', 'c'];
      const result = concatElements(page1, page2);
      
      expect(result.toJS()).toEqual([1, 2, 3, 'a', 'b', 'c']);
    });
  });

  describe('mergeElements', () => {
    it('should merge two objects into a Map', () => {
      const page1 = { name: 'John', age: 30 };
      const page2 = { city: 'New York', country: 'USA' };
      const result = mergeElements(page1, page2);
      
      expect(Map.isMap(result)).toBe(true);
      expect(result.get('name')).toBe('John');
      expect(result.get('age')).toBe(30);
      expect(result.get('city')).toBe('New York');
      expect(result.get('country')).toBe('USA');
    });

    it('should override page1 values with page2 values', () => {
      const page1 = { name: 'John', age: 30, city: 'Boston' };
      const page2 = { age: 31, city: 'New York' };
      const result = mergeElements(page1, page2);
      
      expect(Map.isMap(result)).toBe(true);
      expect(result.get('name')).toBe('John');
      expect(result.get('age')).toBe(31);
      expect(result.get('city')).toBe('New York');
    });

    it('should handle empty objects', () => {
      const page1 = { name: 'John' };
      const page2 = {};
      const result = mergeElements(page1, page2);
      
      expect(Map.isMap(result)).toBe(true);
      expect(result.get('name')).toBe('John');
      expect(result.size).toBe(1);
    });

    it('should merge objects with various data types', () => {
      const page1 = { 
        firstName: 'Guillaume',
        lastName: 'Salva',
        age: 25
      };
      const page2 = { 
        lastName: 'Smith',
        age: 30,
        email: 'guillaume@example.com'
      };
      const result = mergeElements(page1, page2);
      
      expect(result.get('firstName')).toBe('Guillaume');
      expect(result.get('lastName')).toBe('Smith');
      expect(result.get('age')).toBe(30);
      expect(result.get('email')).toBe('guillaume@example.com');
    });
  });
});
