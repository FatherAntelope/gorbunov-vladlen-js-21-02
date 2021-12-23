const request = require('supertest');
import app from '../../src/app';

describe('Testing getUsers router:', () => {
  test('Normal:', async () => {
    const result = await request(app).get('/api/user?page=0&limit=5').send();
    expect(result.statusCode).toBe(200);
  });
  test('Error:', async () => {
    let result = await request(app).get('/api/user?page=0&limit=2').send();
    expect(result.statusCode).toBe(400);
    expect(result.body).toEqual({ status: 400, error: {message: 'Minimum limit size 5 and maximum 20'}});

    result = await request(app).get('/api/user?page=-2').send();
    expect(result.statusCode).toBe(400);
    expect(result.body).toEqual({ status: 400, error: {message: 'Minimum page size 0'}});
  });
});

describe('Testing getUser router:', () => {
  test('Normal:', async () => {
    const result = await request(app).get('/api/user/60d0fe4f5311236168a109cb').send();
    expect(result.statusCode).toBe(200);
  });
  test('Error:', async () => {
    const result = await request(app).get('/api/user/60d0fe4f5311236168a109cb234').send();
    expect(result.statusCode).toBe(404);
    expect(result.body).toEqual({ status: 404, error: {message: 'User not found'}});
  });
});

describe('Testing loginUser router:', () => {
  test('Normal:', async () => {
    const result = await request(app).get('/api/user/60d0fe4f5311236168a109cb/login').send();
    expect(result.statusCode).toBe(200);
  });
  test('Error:', async () => {
    const result = await request(app).get('/api/user/60d0fe4f5311236168a109cb234/login').send();
    expect(result.statusCode).toBe(400);
    expect(result.body).toEqual({ status: 400, error: {message: 'ID not valid'}});
  });
});

describe('Testing createUser router:', () => {
  test('Normal:', async () => {
    const result = await request(app).post('/api/user/create').send({
      firstName: 'JestTest',
      lastName: 'JestTest',
      email: String(Math.floor(Math.random() * 1000) + 100) + '@mail.com'
    });
    expect(result.statusCode).toBe(200);
  });
  test('Error:', async () => {
    const result = await request(app).post('/api/user/create').send();
    expect(result.statusCode).toBe(400);
    expect(result.body).toEqual({ status: 400, error: {message: 'Body not valid'}});
  });
});

describe('Testing updateUser router:', () => {
  test('Normal:', async () => {
    const result = await request(app).put('/api/user/60d0fe4f5311236168a109cb').send({
      firstName: 'Name'
    });
    expect(result.statusCode).toBe(200);
  });
  test('Error:', async () => {
    const result = await request(app).put('/api/user/60d0fe4f5311236168a109cb224').send();
    expect(result.statusCode).toBe(404);
    expect(result.body).toEqual({ status: 404, error: {message: 'User not found'}});
  });
});
