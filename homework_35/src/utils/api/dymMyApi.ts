import axios, { AxiosRequestConfig, Method } from 'axios';
import { API_HEADS, ApiPoints, BASE_URL } from '../../constants/api/dumMyApi';
import { getApiKeysConfigs } from '../configServer';

const { dummyapi } = getApiKeysConfigs();

const fetchBase = (url: string, method: Method, params?: object, body?: object) => {
  let config: AxiosRequestConfig = {
    method,
    headers: {
      [API_HEADS.APP_ID]: dummyapi
    }
  };

  if (params) config = { ...config, params };
  if (body) config = { ...config, data: body };

  return axios(url, config).then(data => data).catch(reason => reason.response);
};

const fetchUsers = (page: number, limit: number) => fetchBase(
  BASE_URL + ApiPoints.USER, 'GET', { page, limit }
);

const fetchUser = (id: string) => fetchBase(BASE_URL + ApiPoints.USER + `/${id}`, 'GET');

const fetchUpdateUser = (id: string, body: object) => fetchBase(
  BASE_URL + ApiPoints.USER + `/${id}`, 'PUT',undefined, body
);

const fetchCreateUser = (body: object) => fetchBase(
  BASE_URL + ApiPoints.USER_CREATE, 'POST', undefined, body
);

const fetchPosts = (page: number, limit: number) => fetchBase(
  BASE_URL + ApiPoints.POST, 'GET', { page, limit }
);

const fetchPost = (id: string) => fetchBase(BASE_URL + ApiPoints.POST + `/${id}`, 'GET');

const fetchPostsByUser = (id: string, page: number, limit: number) => fetchBase(
  BASE_URL + ApiPoints.USER + `/${id}` + ApiPoints.POST, 'GET', { page, limit }
);

const fetchCommentsByPost = (id: string, page: number, limit: number) => fetchBase(
  BASE_URL + ApiPoints.POST + `/${id}` + ApiPoints.COMMENT, 'GET', { page, limit }
);

export {
  fetchUsers, fetchUser, fetchPosts, fetchPost, fetchPostsByUser, fetchCommentsByPost, fetchCreateUser, fetchUpdateUser
};
