import { expect } from 'chai';
import { add, subtract, multiply, divide } from '../src/utils/mathUtils.js';

describe('Math Utils', () => {
  describe('add', () => {
    it('should add two positive numbers', () => {
      expect(add(2, 3)).to.equal(5);
    });

    it('should add negative numbers', () => {
      expect(add(-2, -3)).to.equal(-5);
    });

    it('should add a positive and a negative number', () => {
      expect(add(5, -2)).to.equal(3);
    });

    it('should add decimal numbers', () => {
      expect(add(1.5, 2.3)).to.be.closeTo(3.8, 0.0001);
    });

    it('should throw error for non-numeric first argument', () => {
      expect(() => add('a', 3)).to.throw('Invalid input: both arguments must be numbers');
    });

    it('should throw error for non-numeric second argument', () => {
      expect(() => add(3, 'a')).to.throw('Invalid input: both arguments must be numbers');
    });
  });

  describe('subtract', () => {
    it('should subtract two numbers', () => {
      expect(subtract(10, 4)).to.equal(6);
    });

    it('should return negative result when appropriate', () => {
      expect(subtract(3, 5)).to.equal(-2);
    });

    it('should subtract decimal numbers', () => {
      expect(subtract(5.5, 2.2)).to.be.closeTo(3.3, 0.0001);
    });

    it('should throw error for non-numeric first argument', () => {
      expect(() => subtract('a', 4)).to.throw('Invalid input: both arguments must be numbers');
    });

    it('should throw error for non-numeric second argument', () => {
      expect(() => subtract(4, 'a')).to.throw('Invalid input: both arguments must be numbers');
    });
  });

  describe('multiply', () => {
    it('should multiply two positive numbers', () => {
      expect(multiply(3, 4)).to.equal(12);
    });

    it('should multiply by zero', () => {
      expect(multiply(5, 0)).to.equal(0);
    });

    it('should multiply negative numbers', () => {
      expect(multiply(-3, -4)).to.equal(12);
    });

    it('should multiply a positive and a negative number', () => {
      expect(multiply(-3, 4)).to.equal(-12);
    });

    it('should multiply decimal numbers', () => {
      expect(multiply(2.5, 4)).to.equal(10);
    });

    it('should throw error for non-numeric first argument', () => {
      expect(() => multiply('a', 4)).to.throw('Invalid input: both arguments must be numbers');
    });

    it('should throw error for non-numeric second argument', () => {
      expect(() => multiply(4, 'a')).to.throw('Invalid input: both arguments must be numbers');
    });
  });

  describe('divide', () => {
    it('should divide two numbers', () => {
      expect(divide(10, 2)).to.equal(5);
    });

    it('should return decimal result when needed', () => {
      expect(divide(7, 2)).to.equal(3.5);
    });

    it('should handle negative division', () => {
      expect(divide(-6, 2)).to.equal(-3);
    });

    it('should throw when dividing by zero', () => {
      expect(() => divide(5, 0)).to.throw('Cannot divide by zero');
    });

    it('should throw error for non-numeric first argument', () => {
      expect(() => divide('a', 2)).to.throw('Invalid input: both arguments must be numbers');
    });

    it('should throw error for non-numeric second argument', () => {
      expect(() => divide(2, 'a')).to.throw('Invalid input: both arguments must be numbers');
    });
  });
});
