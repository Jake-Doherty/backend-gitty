const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');

jest.mock('../lib/services/github');

const mockPost = {
  detail: 'this is a mock post!',
};

const bigMockPost = {
  detail:
    'this is a mock post! this is a mock post! this is a mock post! this is a mock post! this is a mock post! this is a mock post! this is a mock post! this is a mock post! this is a mock post! this is a mock post! this is a mock post! this is a mock post! this is a mock post! ',
};

describe('posts routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('POST /api/v1/posts should add a new post to the db by authenticated users only', async () => {
    const agent = request.agent(app);
    await agent.get('/api/v1/github/callback?code=42').redirects(1);
    const resp = await agent.post('/api/v1/posts').send(mockPost);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "detail": "this is a mock post!",
        "id": "9",
      }
    `);
  });

  it('POST /api/v1/posts should not allow posts over 255 char long', async () => {
    const agent = request.agent(app);
    await agent.get('/api/v1/github/callback?code=42').redirects(1);
    const resp = await agent.post('/api/v1/posts').send(bigMockPost);
    expect(resp.status).toBe(400, 'post exceeds 255 character limit!');
  });

  it('GET /api/v1/posts should return a list of all posts for all users', async () => {
    const agent = request.agent(app);
    await agent.get('/api/v1/github/callback?code=42').redirects(1);
    const resp = await agent.get('/api/v1/posts');
    expect(resp.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "detail": "this is a mock post!",
          "id": "1",
        },
        Object {
          "detail": "this is a mock post! this is a mock post!",
          "id": "2",
        },
        Object {
          "detail": "this is a mock post! this is a mock post! this is a mock post!",
          "id": "3",
        },
        Object {
          "detail": "this is a mock post! this is a mock post! this is a mock post! this is a mock post!",
          "id": "4",
        },
        Object {
          "detail": "this is a mock post! this is a mock post! this is a mock post! this is a mock post! this is a mock post!",
          "id": "5",
        },
        Object {
          "detail": "this is a mock post! this is a mock post! this is a mock post! this is a mock post! this is a mock post!this is a mock post!",
          "id": "6",
        },
        Object {
          "detail": "this is a mock post! this is a mock post! this is a mock post! this is a mock post! this is a mock post!this is a mock post!this is a mock post!",
          "id": "7",
        },
        Object {
          "detail": "this is a mock post! this is a mock post! this is a mock post! this is a mock post! this is a mock post!this is a mock post!this is a mock post! this is a mock post!",
          "id": "8",
        },
      ]
    `);
  });
});
