const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { agent } = require('supertest');

jest.mock('../lib/services/github');

describe('github auth', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('GET /api/v1/github/login should redirect to the github oauth page', async () => {
    // this test is passing locally but failed on last push. trying again
    // trying again
    // trying again
    // trying again why not
    // trying again why not^2
    const res = await request(app).get('/api/v1/github/login');
    const URL = await res.header.location;

    console.log(URL);

    expect(URL).toMatch(
      /https:\/\/github.com\/login\/oauth\/authorize\?client_id=[\w\d]+&scope=user&redirect_uri=http:\/\/localhost:7890\/api\/v1\/github\/callback/i
    );
  });

  it('GET /api/v1/github/callback should login users and redirect to dashboard', async () => {
    const res = await request
      .agent(app)
      .get('/api/v1/github/callback?code=42')
      .redirects(1);
    expect(res.body).toEqual({
      id: expect.any(String),
      login: 'fake_github_user',
      email: 'not-real@example.com',
      avatar: 'https://www.placecage.com/gif/300/300',
      iat: expect.any(Number),
      exp: expect.any(Number),
    });
  });

  it('DELETE /api/v1/github should log out current user', async () => {
    const loggedIn = await agent(app).get('/api/v1/github/login');

    const deleteSession = await agent(app).delete('/api/v1/github');

    const signedOut = await agent(app).get('/api/v1/github/dashboard');

    expect(loggedIn.status).toBe(302);
    expect(deleteSession.status).toBe(204);
    expect(signedOut.status).toBe(401);
  });
});
