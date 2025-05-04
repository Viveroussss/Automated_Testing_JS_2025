import { expect } from 'chai';
import {
  filterUsersByAge,
  sortUsersByName,
  findUserById,
  isEmailTaken
} from '../src/utils/userListUtils.js';

describe('User Utilities', () => {
  const users = [
    { id: 1, name: 'Alice', age: 25, email: 'alice@example.com' },
    { id: 2, name: 'Bob', age: 30, email: 'bob@example.com' },
    { id: 3, name: 'Charlie', age: 35, email: 'charlie@example.com' },
    { id: 4, name: 'Diana', age: 40, email: 'diana@example.com' }
  ];

  const usersWithMissingProps = [
    { id: 5, name: 'Eve' }, 
    { id: 6, age: 48, email: 'frank@example.com' }, 
    { name: 'Grace', age: 52, email: 'grace@example.com' }, 
    { id: 7, name: 'Heidi', age: 29 } 
  ];

  describe('filterUsersByAge', () => {
    it('should return users within the specified age range', () => {
      const result = filterUsersByAge(users, 30, 40);
      expect(result.map(u => u.name)).to.include.members(['Bob', 'Charlie', 'Diana']);
    });

    it('should skip users missing age property', () => {
      const result = filterUsersByAge(usersWithMissingProps, 20, 40);
      expect(result.map(u => u.name)).to.include('Heidi');
      expect(result).to.have.lengthOf(1);
    });

    it('should return an empty array if no users match the range', () => {
      const result = filterUsersByAge(users, 100, 200);
      expect(result).to.be.an('array').that.is.empty;
    });

    it('should throw if users is not an array', () => {
      expect(() => filterUsersByAge(null, 20, 30)).to.throw('Users must be an array');
    });
  });

  describe('sortUsersByName', () => {
    it('should return users sorted alphabetically by name', () => {
      const result = sortUsersByName(users);
      expect(result.map(u => u.name)).to.deep.equal(['Alice', 'Bob', 'Charlie', 'Diana']);
    });

    it('should place users without name at the end', () => {
      const result = sortUsersByName(usersWithMissingProps);
      expect(result[result.length - 1].name).to.be.undefined;
    });

    it('should not modify the original array', () => {
      const copy = [...users];
      sortUsersByName(users);
      expect(users).to.deep.equal(copy);
    });

    it('should throw if users is not an array', () => {
      expect(() => sortUsersByName('invalid')).to.throw('Users must be an array');
    });
  });

  describe('findUserById', () => {
    it('should return the user with the given ID', () => {
      const result = findUserById(users, 3);
      expect(result).to.include({ name: 'Charlie', age: 35 });
    });

    it('should return null if no user with given ID exists', () => {
      const result = findUserById(users, 99);
      expect(result).to.be.null;
    });

    it('should handle users missing id property gracefully', () => {
      const result = findUserById(usersWithMissingProps, 999);
      expect(result).to.be.null;
    });

    it('should throw if users is not an array', () => {
      expect(() => findUserById({}, 1)).to.throw('Users must be an array');
    });
  });

  describe('isEmailTaken', () => {
    it('should return true if email exists in the list', () => {
      expect(isEmailTaken(users, 'alice@example.com')).to.be.true;
    });

    it('should return false if email is not found', () => {
      expect(isEmailTaken(users, 'not@found.com')).to.be.false;
    });

    it('should be case-sensitive by default', () => {
      expect(isEmailTaken(users, 'Alice@Example.com')).to.be.false;
    });

    it('should skip users without email', () => {
      const result = isEmailTaken(usersWithMissingProps, 'grace@example.com');
      expect(result).to.be.true;
    });

    it('should throw if users is not an array', () => {
      expect(() => isEmailTaken('not-an-array', 'test@example.com')).to.throw('Users must be an array');
    });
  });
});
