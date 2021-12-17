const request = require('supertest');
import app from '../../src/app';

describe('Testing getCommentsByPost router:', () => {
  test('Normal:', async () => {
    const result = await request(app).get('/api/post/60d21bf967d0d8992e610e9b/comment').send();
    expect(result.statusCode).toBe(200);
  });
  test('Error:', async () => {
    let result = await request(app).get('/api/post/60d21bf967d0d8992e610e9b/comment?page=0&limit=2').send();
    expect(result.statusCode).toBe(400);
    expect(result.body).toEqual({ status: 400, error: {message: 'Minimum limit size 5 and maximum 20'}});

    result = await request(app).get('/api/post/60d21bf967d0d8992e610e9b/comment?page=-2').send();
    expect(result.statusCode).toBe(400);
    expect(result.body).toEqual({ status: 400, error: {message: 'Minimum page size 0'}});

    result = await request(app).get('/api/post/60d21bf967d0d8992e610e9b2355214/comment').send();
    expect(result.statusCode).toBe(404);
    expect(result.body).toEqual({ status: 404, error: {message: 'Post not found'}});
  });
});
