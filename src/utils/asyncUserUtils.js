/**
 * Simulates an API call to fetch user data.
 * @param {number} userId - The ID of the user to fetch.
 * @returns {Promise<Object>} - A promise that resolves with user data or rejects with an error message.
 */
export function fetchUserData(userId) {
    return new Promise((resolve, reject) => {
      if (typeof userId !== 'number' || isNaN(userId)) {
        return reject('Invalid userId. Must be a number');
      }
  
      if (userId < 0) {
        return reject('Invalid userId. Cannot be negative');
      }
  
      setTimeout(() => {
        if (userId === 9) {
          resolve({
            userId: 9,
            username: 'whoami',
            email: 'who.am.i@example.com',
          });
        } else {
          reject('User not found');
        }
      }, 1000);
    });
  }
  