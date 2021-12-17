import { IResponseCommentPreviewConvert, IResponseList } from '../types/api/dumMyApi';
import { fetchCommentsByPost } from '../utils/api/dymMyApi';
import logger from '../logger';
import format from 'string-format';
import loggerMessages from '../constants/loggerMessages';
import CommentMapper from '../mapper/commentMapper';
import HttpStatuses from '../constants/httpStatuses';

class CommentService {
  static async getCommentsByPost(
    id: string, page: number, limit: number
  ): Promise<IResponseList<IResponseCommentPreviewConvert>> {
    const response = await fetchCommentsByPost(id, page, limit);
    switch (response.status) {
      case HttpStatuses.OK: {
        logger.info(format(loggerMessages.GET_COMMENTS_BY_POST.FETCH.SUCCESS, response.status));
        return CommentMapper.getConvertComments(await response.data);
      }
      case HttpStatuses.BAD_REQUEST: {
        logger.info(format(loggerMessages.GET_COMMENTS_BY_POST.FETCH.ERROR, response.status));
        throw new Error(String(HttpStatuses.BAD_REQUEST));
      }
      default: {
        logger.error(format(loggerMessages.GET_COMMENTS_BY_POST.FETCH.ERROR, response.status, response.statusText));
        throw new Error(String(HttpStatuses.SERVER_ERROR));
      }
    }
  }
}

export default CommentService;
