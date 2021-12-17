import axios from 'axios';
import {
  fetchUser, fetchPost, fetchUsers, fetchUpdateUser, fetchPosts, fetchCommentsByPost, fetchCreateUser, fetchPostsByUser
} from '../../../src/utils/api/dymMyApi';

jest.mock('axios', () => jest.fn(() => Promise.resolve({
  data: {
    id: '456tfv5768ds9yhn009802hfnm2',
    title: 'mr',
    firstName: 'Gregory',
    lastName: 'Clifford',
    picture: 'https://url.com/image',
    gender: 'male',
    email: 'mail@example.com',
    dateOfBirth: '1956-04-15T00:10:35.555Z',
    registerDate: '1956-04-15T00:10:35.555Z',
    phone: '88556932716'
  }
})));

describe('Testing fetchUser function', () => {
  test('Normal:', () => {
    fetchUser('456tfv5768ds9yhn009802hfnm2');
    expect(axios).toBeCalledWith(
      "https://dummyapi.io/data/v1/user/456tfv5768ds9yhn009802hfnm2",
      {
        "headers": {"app-id": "617d424dbe5f9771bd07c1b0"},
        "method": "GET"
      }
    );
  })
});

describe('Testing fetchPost function', () => {
  test('Normal:', () => {
    fetchPost('456tfv5768ds9yhn009802hfnm2');
    expect(axios).toBeCalledWith(
      "https://dummyapi.io/data/v1/post/456tfv5768ds9yhn009802hfnm2",
      {
        "headers": {"app-id": "617d424dbe5f9771bd07c1b0"},
        "method": "GET"
      }
    );
  })
});

describe('Testing fetchUsers function', () => {
  test('Normal:', () => {
    fetchUsers(0, 5);
    expect(axios).toBeCalledWith(
      "https://dummyapi.io/data/v1/user",
      {
        "headers": {"app-id": "617d424dbe5f9771bd07c1b0"},
        "method": "GET",
        "params": { "limit": 5, "page": 0 },
      }
    );
  })
});

describe('Testing fetchUpdateUser function', () => {
  test('Normal:', () => {
    fetchUpdateUser('456tfv5768ds9yhn009802hfnm2', { firstName: 'Oleg' });
    expect(axios).toBeCalledWith(
      "https://dummyapi.io/data/v1/user/456tfv5768ds9yhn009802hfnm2",
      {
        "headers": {"app-id": "617d424dbe5f9771bd07c1b0"},
        "method": "PUT",
        "data": { "firstName": "Oleg" }
      }
    );
  })
});

describe('Testing fetchPosts function', () => {
  test('Normal:', () => {
    fetchPosts(0, 5);
    expect(axios).toBeCalledWith(
      "https://dummyapi.io/data/v1/post",
      {
        "headers": {"app-id": "617d424dbe5f9771bd07c1b0"},
        "method": "GET",
        "params": { "limit": 5, "page": 0 },
      }
    );
  })
});

describe('Testing fetchCommentsByPost function', () => {
  test('Normal:', () => {
    fetchCommentsByPost('456tfv5768ds9yhn009802hfnm2', 0, 5);
    expect(axios).toBeCalledWith(
      "https://dummyapi.io/data/v1/post/456tfv5768ds9yhn009802hfnm2/comment",
      {
        "headers": {"app-id": "617d424dbe5f9771bd07c1b0"},
        "method": "GET",
        "params": { "limit": 5, "page": 0 },
      }
    );
  })
});

describe('Testing fetchCreateUser function', () => {
  test('Normal:', () => {
    fetchCreateUser({
      title: 'mr',
      firstName: 'Gregory',
      lastName: 'Clifford',
      picture: 'https://url.com/image',
      gender: 'male',
      email: 'mail@example.com',
      dateOfBirth: '1956-04-15T00:10:35.555Z',
      registerDate: '1956-04-15T00:10:35.555Z',
      phone: '88556932716'
    });
    expect(axios).toBeCalledWith(
      "https://dummyapi.io/data/v1/user/create",
      {
        "headers": {"app-id": "617d424dbe5f9771bd07c1b0"},
        "method": "POST",
        "data": {
          "dateOfBirth": "1956-04-15T00:10:35.555Z",
          "email": "mail@example.com",
          "firstName": "Gregory",
          "gender": "male",
          "lastName": "Clifford",
          "phone": "88556932716",
          "picture": "https://url.com/image",
          "registerDate": "1956-04-15T00:10:35.555Z",
          "title": "mr",
        },
      }
    );
  })
});

describe('Testing fetchPostsByUser function', () => {
  test('Normal:', () => {
    fetchPostsByUser('456tfv5768ds9yhn009802hfnm2', 0, 5);
    expect(axios).toBeCalledWith(
      "https://dummyapi.io/data/v1/user/456tfv5768ds9yhn009802hfnm2/post",
      {
        "headers": {"app-id": "617d424dbe5f9771bd07c1b0"},
        "method": "GET",
        "params": { "limit": 5, "page": 0 },
      }
    );
  })
});
