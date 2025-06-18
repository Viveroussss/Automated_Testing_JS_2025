import * as chai from 'chai';
import supertest from 'supertest';

const { expect } = chai;
const api = supertest('https://demoqa.com');

const FAKE_USER_ID = '00000000-0000-0000-0000-000000000000';

function randomUser() {
  const rand = Math.random().toString(36).substring(2, 10);
  return {
    userName: `user_${rand}`,
    password: `Passw0rd!${rand}`,
  };
}

// Helper to check error response structure
function expectErrorResponse(res, msgPrefix = '') {
  expect(res.body).to.have.property('code', undefined, `${msgPrefix}Missing 'code' property`);
  expect(res.body).to.have.property('message', undefined, `${msgPrefix}Missing 'message' property`);
}

describe('DemoQA Account API', () => {
  describe('POST /Account/v1/User', () => {
    it('should create a user with valid data (positive)', async () => {
      const user = randomUser();
      const res = await api.post('/Account/v1/User').send(user);
      expect(res.status, 'Expected status 201 for user creation').to.equal(201);
      expect(res.body, 'Response should have userID').to.have.property('userID');
      expect(res.body, 'Response should have correct username').to.have.property('username', user.userName);
    });

    // Parameterized negative cases for user creation
    [
      { desc: 'empty password', modify: user => { user.password = ''; }, expectedStatus: 400 },
      { desc: 'empty username', modify: user => { user.userName = ''; }, expectedStatus: 400 },
    ].forEach(({ desc, modify, expectedStatus }) => {
      it(`should not create a user with ${desc} (negative)`, async () => {
        const user = randomUser();
        modify(user);
        const res = await api.post('/Account/v1/User').send(user);
        expect(res.status, `Expected status ${expectedStatus} for ${desc}`).to.equal(expectedStatus);
        expect(res.body, `Error response for ${desc}`).to.have.property('code');
        expect(res.body, `Error response for ${desc}`).to.have.property('message');
      });
    });
  });

  describe('POST /Account/v1/GenerateToken', () => {
    it('should generate a token for an existing user (positive)', async () => {
      const user = randomUser();
      await api.post('/Account/v1/User').send(user);
      const res = await api.post('/Account/v1/GenerateToken').send(user);
      expect(res.status, 'Expected status 200 for token generation').to.equal(200);
      expect(res.body, 'Response should have token').to.have.property('token');
      expect(res.body, 'Response should have status Success').to.have.property('status', 'Success');
    });

    // Parameterized negative cases for token generation
    [
      { desc: 'incorrect password', getUser: () => { const user = randomUser(); return { user, wrongPass: 'WrongPassword123!' }; }, expectedStatus: 200, expectedStatusText: 'Failed', expectedResult: 'User authorization failed.' },
    ].forEach(({ desc, getUser, expectedStatus, expectedStatusText, expectedResult }) => {
      it(`should not generate a token with ${desc} (negative)`, async () => {
        const { user, wrongPass } = getUser();
        await api.post('/Account/v1/User').send(user);
        const res = await api.post('/Account/v1/GenerateToken').send({
          userName: user.userName,
          password: wrongPass
        });
        expect(res.status, `Expected status ${expectedStatus} for ${desc}`).to.equal(expectedStatus);
        expect(res.body, `Response should have status ${expectedStatusText} for ${desc}`).to.have.property('status', expectedStatusText);
        expect(res.body, `Response should have result '${expectedResult}' for ${desc}`).to.have.property('result', expectedResult);
      });
    });
  });

  describe('GET /Account/v1/User/{UUID}', () => {
    it('should get info about an existing user (positive)', async () => {
      const user = randomUser();
      const createRes = await api.post('/Account/v1/User').send(user);
      const userId = createRes.body.userID;
      const tokenRes = await api.post('/Account/v1/GenerateToken').send(user);
      const token = tokenRes.body.token;
      const res = await api.get(`/Account/v1/User/${userId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status, 'Expected status 200 for user info').to.equal(200);
      expect(res.body, 'Response should have correct userId').to.have.property('userId', userId);
      expect(res.body, 'Response should have correct username').to.have.property('username', user.userName);
    }).timeout(10000);

    // Parameterized negative case for non-existent user
    it('should not get info for a non-existent user (negative)', async () => {
      const res = await api.get(`/Account/v1/User/${FAKE_USER_ID}`);
      expect(res.status, 'Expected status 401 for non-existent user').to.equal(401);
      expect(res.body, 'Error response for non-existent user').to.have.property('code');
      expect(res.body, 'Error response for non-existent user').to.have.property('message');
    });
  });

  describe('DELETE /Account/v1/User/{UUID}', () => {
    it('should delete an existing user (positive)', async () => {
      const user = randomUser();
      const createRes = await api.post('/Account/v1/User').send(user);
      const userId = createRes.body.userID;
      const tokenRes = await api.post('/Account/v1/GenerateToken').send(user);
      const token = tokenRes.body.token;
      const res = await api.delete(`/Account/v1/User/${userId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status, 'Expected status 204 for user deletion').to.equal(204);
    }).timeout(10000);

    // Parameterized negative case for non-existent user
    it('should not delete a non-existent user (negative)', async () => {
      const res = await api.delete(`/Account/v1/User/${FAKE_USER_ID}`);
      expect([401, 400, 404], 'Expected status 401, 400, or 404 for non-existent user').to.include(res.status);
      expect(res.body, 'Error response for non-existent user').to.have.property('code');
      expect(res.body, 'Error response for non-existent user').to.have.property('message');
    });
  });
}); 