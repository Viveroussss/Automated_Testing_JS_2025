import { expect } from 'chai';
import { fetchUserData } from '../src/utils/asyncUserUtils.js';

describe('fetchUserData', () => {
  it('should return user data for valid userId', async () => {
    const user = await fetchUserData(9);
    expect(user).to.be.an('object');

    expect(user).to.have.property('userId', 9);
    expect(user).to.have.property('username', 'whoami');
    expect(user).to.have.property('email', 'who.am.i@example.com');
  });

  it('should throw an error for invalid userId', async () => {
    try {
      await fetchUserData(99);
    } catch (error) {
      expect(error).to.equal('User not found');
    }
  });

  it('should throw an error for non-numeric userId', async () => {
    try {
      await fetchUserData('abc');
    } catch (error) {
      expect(error).to.equal('Invalid userId. Must be a number');
    }
  });

  it('should throw an error for negative userId', async () => {
    try {
      await fetchUserData(-1);
    } catch (error) {
      expect(error).to.equal('Invalid userId. Cannot be negative');
    }
  });

  it('should throw an error for undefined userId', async () => {
    try {
      await fetchUserData();
    } catch (error) {
      expect(error).to.equal('Invalid userId. Must be a number');
    }
  });

  it('should throw an error for null userId', async () => {
    try {
      await fetchUserData(null);
    } catch (error) {
      expect(error).to.equal('Invalid userId. Must be a number');
    }
  });

  it('should throw an error for empty string userId', async () => {
    try {
      await fetchUserData('');
    } catch (error) {
      expect(error).to.equal('Invalid userId. Must be a number');
    }
  });
});