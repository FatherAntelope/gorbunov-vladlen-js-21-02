import axios, { Method, AxiosRequestConfig } from 'axios';
import { ApiPoints, BASE_SERVER_URL } from '../constants/api/localServerApi';

const fetchBase = (url: string, method: Method, params?: object, body?: object) => {
  let config: AxiosRequestConfig = {
    method,
  };

  if (params) config = { ...config, params };
  if (body) config = { ...config, data: body };

  return axios(url, config).then((data) => data).catch((reason) => reason.response);
};

const fetchUsersForm = (page: number, limit: number) => fetchBase(
  BASE_SERVER_URL + ApiPoints.USER, 'GET', { page, limit }
);
const fetchPostsForm = (page: number, limit: number) => fetchBase(
  BASE_SERVER_URL + ApiPoints.POST, 'GET', { page, limit }
);
const fetchPostForm = (id: string) => fetchBase(`${BASE_SERVER_URL + ApiPoints.POST}/${id}`, 'GET');
const fetchUserFullForm = (id: string) => fetchBase(`${BASE_SERVER_URL + ApiPoints.USER}/${id}`, 'GET');
const fetchUserLoginForm = (id: string) => fetchBase(`${BASE_SERVER_URL + ApiPoints.USER}/${id}/login`, 'GET');
const fetchUserPostsForm = (id: string, page: number, limit: number) => fetchBase(
  `${BASE_SERVER_URL + ApiPoints.USER}/${id}${ApiPoints.POST}`, 'GET', { page, limit }
);
const fetchPostCommentsForm = (id: string, page: number, limit: number) => fetchBase(
  `${BASE_SERVER_URL + ApiPoints.POST}/${id}${ApiPoints.COMMENT}`, 'GET', { page, limit }
);

const fetchRegisterUser = (body: object) => fetchBase(
  BASE_SERVER_URL + ApiPoints.USER_CREATE, 'POST', undefined, body
);
const fetchUpdateUser = (id:string, body: object) => fetchBase(
  `${BASE_SERVER_URL + ApiPoints.USER}/${id}`, 'PUT', undefined, body
);

export {
  fetchUsersForm, fetchPostsForm, fetchUserFullForm, fetchUserPostsForm, fetchRegisterUser, fetchPostCommentsForm,
  fetchPostForm, fetchUpdateUser, fetchUserLoginForm
};
