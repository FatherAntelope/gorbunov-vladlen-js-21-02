import {
  IResponseList,
  IResponsePostConvert,
  IResponsePostPreviewConvert, IResponsePostUserConvert
} from '../types/api/dumMyApi';
import logger from '../logger';
import format from 'string-format';
import loggerMessages from '../constants/loggerMessages';
import {fetchPosts, fetchPost, fetchPostsByUser} from '../utils/api/dymMyApi';
import PostMapper from '../mapper/postMapper';
import HttpStatuses from '../constants/httpStatuses';

class PostService {
  static async getPostsByUser(
    id: string, page: number, limit: number
  ): Promise<IResponseList<IResponsePostUserConvert>> {
    const response = await fetchPostsByUser(id, page, limit);
    switch (response.status) {
      case HttpStatuses.OK: {
        logger.info(format(loggerMessages.GET_POSTS_BY_USER.FETCH.SUCCESS, response.status));
        return PostMapper.getConvertUsersPosts(await response.data);
      }
      case HttpStatuses.BAD_REQUEST: {
        logger.error(format(loggerMessages.GET_POSTS_BY_USER.FETCH.ERROR, response.status));
        throw new Error(String(HttpStatuses.BAD_REQUEST));
      }
      default: {
        logger.error(format(loggerMessages.GET_POSTS_BY_USER.FETCH.ERROR, response.status, response.statusText));
        throw new Error(String(HttpStatuses.SERVER_ERROR));
      }
    }
  }

  static async getPost(id: string): Promise<IResponsePostConvert> {
    const response = await fetchPost(id);
    switch (response.status) {
      case HttpStatuses.OK: {
        logger.info(format(loggerMessages.GET_POST_ID.FETCH.SUCCESS, response.status));
        return PostMapper.getConvertPost(await response.data);
      }
      case HttpStatuses.BAD_REQUEST: {
        logger.error(format(loggerMessages.GET_POST_ID.FETCH.ERROR, response.status));
        throw new Error(String(HttpStatuses.BAD_REQUEST));
      }
      default: {
        logger.error(format(loggerMessages.GET_POST_ID.FETCH.ERROR, response.status, response.statusText));
        throw new Error(String(HttpStatuses.SERVER_ERROR));
      }
    }
  }

  static async getPosts(page: number, limit: number): Promise<IResponseList<IResponsePostPreviewConvert>> {
    const response = await fetchPosts(page, limit);
    switch (response.status) {
      case HttpStatuses.OK: {
        logger.info(format(loggerMessages.GET_POST_LIST.FETCH.SUCCESS, response.status));
        return PostMapper.getConvertPosts(await response.data);
      }
      default: {
        logger.error(format(loggerMessages.GET_POST_LIST.FETCH.ERROR, response.status, response.statusText));
        throw new Error(loggerMessages.GET_POST_LIST.FETCH.ERROR);
      }
    }
  }
}

export default PostService;
