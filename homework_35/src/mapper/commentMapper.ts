import {
  IResponseCommentPreview,
  IResponseCommentPreviewConvert,
  IResponseList,
} from '../types/api/dumMyApi';
import { getConvertDateOfPublish } from '../utils/common';
import UserMapper from './userMapper';

class CommentMapper {
  static getConvertComments(
    commentList: IResponseList<IResponseCommentPreview>
  ): IResponseList<IResponseCommentPreviewConvert> {
    const data = commentList.data.map((item: IResponseCommentPreview) => ({
      id: item.id,
      message: item.message,
      publishDate: getConvertDateOfPublish(item.publishDate),
      owner: UserMapper.getConvertUserPreview(item.owner)
    }));

    const { page, limit, total } = commentList;
    return { data, page, limit, total };
  }
}

export default CommentMapper;
