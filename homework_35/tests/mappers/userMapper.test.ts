import UserMapper from '../../src/mapper/userMapper';
import {
  IResponseList, IResponseUserAuth, IResponseUserFull, IResponseUserFullConvert, IResponseUserPreview,
  IResponseUserPreviewConvert
} from '../../src/types/api/dumMyApi';

describe('Testing getConvertUserAuth static method:', () => {
  const received: IResponseUserFull = {
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
  };
  const expected: IResponseUserAuth = {
    id: '456tfv5768ds9yhn009802hfnm2',
    firstName: 'Gregory',
    picture: 'https://url.com/image'
  };
  test('Normal:', () => {
    expect(UserMapper.getConvertUserAuth(received)).toEqual(expected);
  });
});

describe('Testing getConvertUsersList static method:', () => {
  const received: IResponseList<IResponseUserPreview> = {
    data: [{
      id: '456tfv5768ds9yhn009802hfnm2',
      title: 'ms',
      firstName: 'Olga',
      lastName: 'Ivanova',
      picture: 'https://url.com/image',
    }],
    limit: 1,
    page: 0,
    total: 0
  };
  const expected: IResponseList<IResponseUserPreviewConvert> = {
    data: [{
      id: '456tfv5768ds9yhn009802hfnm2',
      title: 'ms',
      fullName: 'Olga Ivanova',
      picture: 'https://url.com/image',
    }],
    limit: 1,
    page: 0,
    total: 0
  };
  test('Normal:', () => {
    expect(UserMapper.getConvertUsersList(received)).toEqual(expected);
  });
});

describe('Testing getConvertUser static method:', () => {
  const received: IResponseUserFull = {
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
  };
  const expected: IResponseUserFullConvert = {
    id: '456tfv5768ds9yhn009802hfnm2',
    title: 'mr',
    fullName: 'Gregory Clifford',
    picture: 'https://url.com/image',
    gender: 'male',
    email: 'mail@example.com',
    dateOfBirth: '15 апреля 1956',
    dateOfBirthOriginal: '1956-04-15T00:10:35.555Z',
    registerDate: '15 апреля 1956',
    phone: '88556932716'
  };
  test('Normal:', () => {
    expect(UserMapper.getConvertUser(received)).toEqual(expected);
  });
});
