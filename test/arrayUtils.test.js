import { expect } from 'chai';
import { findMax, findMin, removeDuplicates } from '../src/utils/arrayUtils.js';

describe('Array Utils', () => {

  describe('findMax', () => {
    it('should return the maximum number from an array of numbers', () => {
      expect(findMax([1, 2, 3, 4, 5])).to.equal(5);
    });

    it('should return the single element if the array contains only one element', () => {
      expect(findMax([5])).to.equal(5);

    });

    it('should return -Infinity for an empty array', () => {
      expect(findMax([])).to.equal(-Infinity);
    });

    it('should handle arrays with negative numbers', () => {
      expect(findMax([-1, -2, -3, -4])).to.equal(-1);
    });

    it('should throw an error if input is not an array', () => {
      expect(() => findMax('not an array')).to.throw('Input must be an array');
      expect(() => findMax(123)).to.throw('Input must be an array');
      expect(() => findMax(null)).to.throw('Input must be an array');
      expect(() => findMax(undefined)).to.throw('Input must be an array');
    });
  });

  describe('findMin', () => {
    it('should return the minimum number from an array of numbers', () => {
      expect(findMin([1, 2, 3, 4, 5])).to.equal(1);
    });

    it('should return the single element if the array contains only one element', () => {
      expect(findMin([5])).to.equal(5);
    });

    it('should return Infinity for an empty array', () => {
      expect(findMin([])).to.equal(Infinity);
    });

    it('should handle arrays with negative numbers', () => {
      expect(findMin([-1, -2, -3, -4])).to.equal(-4);
    });

    it('should throw an error if input is not an array', () => {
      expect(() => findMin('not an array')).to.throw('Input must be an array');
      expect(() => findMin(123)).to.throw('Input must be an array');
      expect(() => findMin(null)).to.throw('Input must be an array');
      expect(() => findMin(undefined)).to.throw('Input must be an array');
    });
  });

  describe('removeDuplicates', () => {
    it('should remove duplicates from an array of numbers', () => {
      expect(removeDuplicates([1, 2, 2, 3, 4, 4, 5])).to.deep.equal([1, 2, 3, 4, 5]);
    });

    it('should return an empty array if input is empty', () => {
      expect(removeDuplicates([])).to.deep.equal([]);
    });

    it('should not modify the array if there are no duplicates', () => {
      expect(removeDuplicates([1, 2, 3, 4, 5])).to.deep.equal([1, 2, 3, 4, 5]);
    });

    it('should handle arrays with only duplicates', () => {
      expect(removeDuplicates([1, 1, 1, 1, 1])).to.deep.equal([1]);
    });

    it('should throw an error if input is not an array', () => {
      expect(() => removeDuplicates('not an array')).to.throw('Input must be an array');
      expect(() => removeDuplicates(123)).to.throw('Input must be an array');
      expect(() => removeDuplicates(null)).to.throw('Input must be an array');
      expect(() => removeDuplicates(undefined)).to.throw('Input must be an array');
    });
  });
});
