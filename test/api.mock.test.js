import * as chai from 'chai';
import nock from 'nock';
import supertest from 'supertest';

const { expect } = chai;
const api = supertest('https://api.example.com');

const userResponse = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  username: 'johndoe',
  phone: '+1-555-123-4567',
  address: {
    street: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipcode: '10001',
    country: 'USA',
  },
  company: {
    name: 'Doe Enterprises',
    industry: 'Technology',
    position: 'Software Engineer',
  },
  dob: '1990-05-15',
  profile_picture_url: 'https://example.com/images/johndoe.jpg',
  is_active: true,
  created_at: '2023-01-01T12:00:00Z',
  updated_at: '2023-10-01T12:00:00Z',
  preferences: {
    language: 'en',
    timezone: 'America/New_York',
    notifications_enabled: true,
  },
};


const errorResponse = {
  error: 'Not Found',
  details: 'User not found',
};

const forbiddenResponse = { error: 'Forbidden', details: 'Access denied' };
const badGatewayResponse = { error: 'Bad Gateway', details: 'Upstream error' };

describe('Mocked API /users/:id', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should return a valid user for id=1 (200)', async () => {
    nock('https://api.example.com')
      .get('/users/1')
      .reply(200, userResponse);
    const res = await api.get('/users/1');
    expect(res.status, 'Expected status 200 for valid user').to.equal(200);
    expect(res.body, 'Response should include all user keys').to.include.all.keys('id', 'name', 'email', 'username', 'phone', 'address', 'company', 'dob', 'profile_picture_url', 'is_active', 'created_at', 'updated_at', 'preferences');
    expect(res.body.address, 'Address should include all keys').to.include.all.keys('street', 'city', 'state', 'zipcode', 'country');
    expect(res.body.company, 'Company should include all keys').to.include.all.keys('name', 'industry', 'position');
    expect(res.body.preferences, 'Preferences should include all keys').to.include.all.keys('language', 'timezone', 'notifications_enabled');
    expect(res.body.id, 'User id should be a number').to.be.a('number');
    expect(res.body.name, 'User name should be a string').to.be.a('string');
    expect(res.body.email, 'User email should be a string').to.be.a('string');
    expect(res.body.is_active, 'User is_active should be a boolean').to.be.a('boolean');
  });

  it('should return 204 for no content', async () => {
    nock('https://api.example.com')
      .get('/users/2')
      .reply(204);
    const res = await api.get('/users/2');
    expect(res.status, 'Expected status 204 for no content').to.equal(204);
    expect(res.body, 'Response body should be empty object for 204').to.deep.equal({});
  });

  const errorCases = [
    {
      id: 3,
      status: 403,
      response: forbiddenResponse,
      description: 'forbidden',
    },
    {
      id: 999,
      status: 404,
      response: errorResponse,
      description: 'not found',
    },
    {
      id: 4,
      status: 502,
      response: badGatewayResponse,
      description: 'bad gateway',
    },
    {
      id: 404,
      status: 404,
      response: errorResponse,
      description: 'error response structure',
      validateStructure: true,
    },
  ];

  errorCases.forEach(({ id, status, response, description, validateStructure }) => {
    it(`should return ${status} for ${description}`, async () => {
      nock('https://api.example.com')
        .get(`/users/${id}`)
        .reply(status, response);
      const res = await api.get(`/users/${id}`);
      expect(res.status, `Expected status ${status} for ${description}`).to.equal(status);
      if (validateStructure) {
        expect(res.body, 'Error response should have error and details keys').to.have.all.keys('error', 'details');
        expect(res.body.error, 'Error property should be a string').to.be.a('string');
        expect(res.body.details, 'Details property should be a string').to.be.a('string');
      } else {
        Object.entries(response).forEach(([key, value]) => {
          expect(res.body, `Error response should have property ${key} with value ${value}`).to.have.property(key, value);
        });
      }
    });
  });
}); 