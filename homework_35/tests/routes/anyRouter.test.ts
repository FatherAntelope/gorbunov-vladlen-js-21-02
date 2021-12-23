const request = require('supertest');
import app from '../../src/app';

describe('Testing getCommentsByPost router:', () => {
  test('Normal:', async () => {
    const result = await request(app).get('/api/any').send();
    expect(result.statusCode).toBe(404);
    expect(result.body).toEqual({error: {message: 'End point not found'}, status: 404});
  });
});
