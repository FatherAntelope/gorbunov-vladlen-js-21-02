import { fetchUsers, fetchUser, fetchCreateUser, fetchUpdateUser } from '../utils/api/dymMyApi';
import {
  IResponseList, IResponseUserAuth,
  IResponseUserFullConvert,
  IResponseUserPreviewConvert
} from '../types/api/dumMyApi';
import { AxiosResponse } from 'axios';
import loggerMessages from '../constants/loggerMessages';
import logger from '../logger';
import format from 'string-format';
import UserMapper from '../mapper/userMapper';
import HttpStatuses from '../constants/httpStatuses';
import { fetchUploadImage } from '../utils/api/imgbb';

class UserService {
  static async updateUser(id: string, body: any): Promise<IResponseUserFullConvert> {
    let response: AxiosResponse;
    if (body.picture) {
      response = await fetchUploadImage(body.picture);
      body.picture = response.data.data.url;
      response = await fetchUpdateUser(id, body);
    } else {
      response = await fetchUpdateUser(id, body);
    }
    switch (response.status) {
      case HttpStatuses.OK: {
        logger.info(format(loggerMessages.UPDATE_USER.FETCH.SUCCESS, String(response.status)));
        return UserMapper.getConvertUser(await response.data);
      }
      case HttpStatuses.BAD_REQUEST: {
        logger.error(format(loggerMessages.UPDATE_USER.FETCH.ERROR, String(response.status)));
        throw new Error(String(HttpStatuses.BAD_REQUEST));
      }
      default: {
        logger.error(format(loggerMessages.UPDATE_USER.FETCH.ERROR, String(response.status), response.statusText));
        throw new Error(String(HttpStatuses.SERVER_ERROR));
      }
    }
  }

  static async createUser(body: object): Promise<IResponseUserAuth> {
    const response: AxiosResponse = await fetchCreateUser(body);
    switch (response.status) {
      case HttpStatuses.OK: {
        logger.info(format(loggerMessages.CREATE_USER.FETCH.SUCCESS, String(response.status)));
        return UserMapper.getConvertUserAuth(await response.data);
      }
      case HttpStatuses.BAD_REQUEST: {
        logger.error(format(loggerMessages.UPDATE_USER.FETCH.ERROR, String(response.status)));
        throw new Error(String(HttpStatuses.BAD_REQUEST));
      }
      default: {
        logger.error(format(loggerMessages.CREATE_USER.FETCH.ERROR, String(response.status), response.statusText));
        throw new Error(String(HttpStatuses.SERVER_ERROR));
      }
    }
  }

  static async loginUser(id: string): Promise<IResponseUserAuth> {
    const response: AxiosResponse = await fetchUser(id);
    switch (response.status) {
      case HttpStatuses.OK: {
        logger.info(format(loggerMessages.GET_USER_LOGIN.FETCH.SUCCESS, String(response.status)));
        return UserMapper.getConvertUserAuth(await response.data);
      }
      case HttpStatuses.BAD_REQUEST: {
        logger.error(format(loggerMessages.GET_USER_LOGIN.FETCH.ERROR, String(response.status)));
        throw new Error(String(HttpStatuses.BAD_REQUEST));
      }
      default: {
        logger.error(format(loggerMessages.GET_USER_LOGIN.FETCH.ERROR, String(response.status), response.statusText));
        throw new Error(String(HttpStatuses.SERVER_ERROR));
      }
    }
  }

  static async getUser(id: string): Promise<IResponseUserFullConvert> {
    const response: AxiosResponse = await fetchUser(id);
    switch (response.status) {
      case HttpStatuses.OK: {
        logger.info(format(loggerMessages.GET_USER_ID.FETCH.SUCCESS, String(response.status)));
        return UserMapper.getConvertUser(await response.data);
      }
      case HttpStatuses.BAD_REQUEST: {
        logger.error(format(loggerMessages.GET_USER_ID.FETCH.ERROR, String(response.status)));
        throw new Error(String(HttpStatuses.BAD_REQUEST));
      }
      default: {
        logger.error(format(loggerMessages.GET_USER_ID.FETCH.ERROR, String(response.status), response.statusText));
        throw new Error(String(HttpStatuses.SERVER_ERROR));
      }
    }
  }

  static async getUsers(page: number, limit: number): Promise<IResponseList<IResponseUserPreviewConvert>> {
    const response: AxiosResponse = await fetchUsers(page, limit);
    switch (response.status) {
      case HttpStatuses.OK: {
        logger.info(format(loggerMessages.GET_USER_LIST.FETCH.SUCCESS, String(response.status)));
        return UserMapper.getConvertUsersList(await response.data);
      }
      default: {
        logger.error(format(loggerMessages.GET_USER_LIST.FETCH.ERROR, String(response.status), response.statusText));
        throw new Error(loggerMessages.GET_USER_LIST.FETCH.ERROR);
      }
    }
  }
}

export default UserService;
