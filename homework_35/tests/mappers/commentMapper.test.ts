import CommentMapper from '../../src/mapper/commentMapper';
import {
  IResponseCommentPreview, IResponseCommentPreviewConvert, IResponseList
} from '../../src/types/api/dumMyApi';

describe('Testing getConvertComments static method:', () => {
  const received: IResponseList<IResponseCommentPreview> = {
    data: [{
      id: '32235235wdfcv23tgf311',
      owner: {
        id: '456tfv5768ds9yhn009802hfnm2',
        title: 'ms',
        firstName: 'Olga',
        lastName: 'Ivanova',
        picture: 'https://url.com/image',
      },
      post: '67tyjukmunh1r7658276yuhj',
      publishDate: '1956-04-15T00:10:35.555Z',
      message: 'lorem ipsum dolor'
    }],
    limit: 1,
    page: 0,
    total: 1
  };
  const expected: IResponseList<IResponseCommentPreviewConvert> = {
    data: [{
      id: '32235235wdfcv23tgf311',
      owner: {
        id: '456tfv5768ds9yhn009802hfnm2',
        title: 'ms',
        fullName: 'Olga Ivanova',
        picture: 'https://url.com/image',
      },
      publishDate: '15 апр. 1956 г. в 3:10',
      message: 'lorem ipsum dolor'
    }],
    limit: 1,
    page: 0,
    total: 1
  };
  test('Normal:', () => {
    expect(CommentMapper.getConvertComments(received)).toEqual(expected);
  });
});
