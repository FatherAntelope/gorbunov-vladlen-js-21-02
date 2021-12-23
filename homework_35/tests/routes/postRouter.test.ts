const request = require('supertest');
import app from '../../src/app';

describe('Testing getPosts router:', () => {
  test('Normal:', async () => {
    const result = await request(app).get('/api/post?page=0&limit=5').send();
    expect(result.statusCode).toBe(200);
  });
  test('Error:', async () => {
    let result = await request(app).get('/api/post?page=0&limit=2').send();
    expect(result.statusCode).toBe(400);
    expect(result.body).toEqual({ status: 400, error: {message: 'Minimum limit size 5 and maximum 20'}});

    result = await request(app).get('/api/post?page=-2').send();
    expect(result.statusCode).toBe(400);
    expect(result.body).toEqual({ status: 400, error: {message: 'Minimum page size 0'}});
  });
});

describe('Testing getPost router:', () => {
  test('Normal:', async () => {
    const result = await request(app).get('/api/post/60d21b4967d0d8992e610c90').send();
    expect(result.statusCode).toBe(200);
  });
  test('Error:', async () => {
    const result = await request(app).get('/api/post/60d21b4967d0d8992e610c90212').send();
    expect(result.statusCode).toBe(404);
    expect(result.body).toEqual({ status: 404, error: {message: 'Post not found'}});
  });
});

describe('Testing getPostsByUser router:', () => {
  test('Normal:', async () => {
    const result = await request(app).get('/api/user/60d0fe4f5311236168a109cb/post').send();
    expect(result.statusCode).toBe(200);
  });
  test('Error:', async () => {
    let result = await request(app).get('/api/user/60d0fe4f5311236168a109c234b/post').send();
    expect(result.statusCode).toBe(404);
    expect(result.body).toEqual({ status: 404, error: {message: 'User not found'}});

    result = await request(app).get('/api/user/60d0fe4f5311236168a109cb/post?limit=2').send();
    expect(result.statusCode).toBe(400);
    expect(result.body).toEqual({ status: 400, error: {message: 'Minimum limit size 5 and maximum 20'}});

    result = await request(app).get('/api/user/60d0fe4f5311236168a109cb/post?page=-2').send();
    expect(result.statusCode).toBe(400);
    expect(result.body).toEqual({ status: 400, error: {message: 'Minimum page size 0'}});
  });
});
