import { expect } from 'chai';
import { capitalize, reverseString, isPalindrome } from '../src/utils/stringUtils.js';

describe('String Utils', () => {

  describe('capitalize', () => {
    it('should capitalize the first letter of a string', () => {
      expect(capitalize('hello')).to.equal('Hello');
    });

    it('should return the same string if the first letter is already capitalized', () => {
      expect(capitalize('Hello')).to.equal('Hello');
    });

    it('should handle an empty string', () => {
      expect(capitalize('')).to.equal('');
    });

    it('should throw an error if input is not a string', () => {
      expect(() => capitalize(123)).to.throw('Input must be a string');
      expect(() => capitalize(null)).to.throw('Input must be a string');
      expect(() => capitalize(undefined)).to.throw('Input must be a string');
    });
  });

  describe('reverseString', () => {
    it('should reverse the characters of a string', () => {
      expect(reverseString('hello')).to.equal('olleh');
    });

    it('should return the same string if it is a palindrome', () => {
      expect(reverseString('madam')).to.equal('madam');
    });

    it('should handle an empty string', () => {
      expect(reverseString('')).to.equal('');
    });

    it('should throw an error if input is not a string', () => {
      expect(() => reverseString(123)).to.throw('Input must be a string');
      expect(() => reverseString(null)).to.throw('Input must be a string');
      expect(() => reverseString(undefined)).to.throw('Input must be a string');
    });
  });

  describe('isPalindrome', () => {
    it('should return true for a palindrome string', () => {
      expect(isPalindrome('madam')).to.be.true;
    });

    it('should return false for a non-palindrome string', () => {
      expect(isPalindrome('hello')).to.be.false;
    });

    it('should return true for an empty string (empty string is considered a palindrome)', () => {
      expect(isPalindrome('')).to.be.true;
    });

    it('should throw an error if input is not a string', () => {
      expect(() => isPalindrome(123)).to.throw('Input must be a string');
      expect(() => isPalindrome(null)).to.throw('Input must be a string');
      expect(() => isPalindrome(undefined)).to.throw('Input must be a string');
    });
  });
});
