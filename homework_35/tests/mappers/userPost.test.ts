import {
  IResponseList,
  IResponsePostPreview,
  IResponsePostPreviewConvert, IResponsePostUserConvert
} from '../../src/types/api/dumMyApi';
import PostMapper from '../../src/mapper/postMapper';

describe('Testing getConvertPosts static method:', () => {
  const received: IResponseList<IResponsePostPreview>  = {
    data: [{
      id: '816297098oji23ojmkl',
      text: 'Какое-то сообщение',
      image: 'https://url.com/image',
      publishDate: '1956-04-15T00:10:35.555Z',
      likes: 0,
      tags: [''],
      owner: {
        id: '456tfv5768ds9yhn009802hfnm2',
        title: 'mr',
        firstName: 'Gregory',
        lastName: 'Clifford',
        picture: 'https://url.com/image'
      }
    }],
    limit: 1,
    page: 0,
    total: 0
  };
  const expected: IResponseList<IResponsePostPreviewConvert>  = {
    data: [{
      id: '816297098oji23ojmkl',
      text: 'Какое-то сообщение',
      image: 'https://url.com/image',
      publishDate: '15 апр. 1956 г. в 3:10',
      owner: {
        id: '456tfv5768ds9yhn009802hfnm2',
        title: 'mr',
        fullName: 'Gregory Clifford',
        picture: 'https://url.com/image'
      }
    }],
    limit: 1,
    page: 0,
    total: 0
  };
  test('Normal', () => {
    expect(PostMapper.getConvertPosts(received)).toEqual(expected);
  });
});

describe('Testing getConvertUsersPosts static method:', () => {
  const received: IResponseList<IResponsePostPreview>  = {
    data: [{
      id: '816297098oji23ojmkl',
      text: 'Какое-то сообщение',
      image: 'https://url.com/image',
      publishDate: '1956-04-15T00:10:35.555Z',
      likes: 0,
      tags: [''],
      owner: {
        id: '456tfv5768ds9yhn009802hfnm2',
        title: 'mr',
        firstName: 'Gregory',
        lastName: 'Clifford',
        picture: 'https://url.com/image'
      },
    }],
    limit: 1,
    page: 0,
    total: 0
  };
  const expected: IResponseList<IResponsePostUserConvert>  = {
    data: [{
      id: '816297098oji23ojmkl',
      text: 'Какое-то сообщение',
      image: 'https://url.com/image',
      publishDate: '15 апр. 1956 г. в 3:10',
    }],
    limit: 1,
    page: 0,
    total: 0
  };
  test('Normal', () => {
    expect(PostMapper.getConvertUsersPosts(received)).toEqual(expected);
  });
});
