const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');

const mockPost = {
  detail: 'this is a mock post!',
};

describe('posts routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('POST /api/v1/posts should return a list of all posts for all users', async () => {
    const resp = await request(app).post('/api/v1/posts').send(mockPost);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "detail": "this is a mock post!",
        "id": "1",
      }
    `);
  });
});
