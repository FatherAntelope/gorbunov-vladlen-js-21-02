import {
  API_HEADS,
  API_KEY,
  API_POINT_COMMENT,
  API_POINT_POST,
  API_POINT_USER,
  API_POINT_USER_CREATE,
  BASE_URL,
  ContentTypes,
  METHODS_QUERY
} from '../constants/api/dumMyApi';

const fetchBase = (baseURL: string, apiPoint: string, searchParams?: Record<string, any>) => {
  let url = baseURL + apiPoint;
  url += searchParams ? `?${new URLSearchParams(searchParams)}` : '';

  return fetch(url.toString(), {
    method: METHODS_QUERY.GET,
    headers: new Headers({
      [API_HEADS.APP_ID]: API_KEY
    })
  });
};

const fetchBaseSend = (baseURL: string, apiPoint: string, method: string, body?: string) => {
  const url = baseURL + apiPoint;

  return fetch(url.toString(), {
    method,
    headers: new Headers({
      [API_HEADS.APP_ID]: API_KEY,
      [API_HEADS.CONTENT_TYPE]: ContentTypes.JSON
    }),
    body
  });
};

const fetchUsersForm = (page: number, limit: number) => fetchBase(BASE_URL, API_POINT_USER, { page, limit });
const fetchUserFullForm = (id: string) => fetchBase(BASE_URL, `${API_POINT_USER}/${id}`);
const fetchPostForm = (id: string) => fetchBase(BASE_URL, `${API_POINT_POST}/${id}`);
const fetchUserPostsForm = (id: string, page: number, limit: number) => fetchBase(
  BASE_URL, `${API_POINT_USER}/${id}${API_POINT_POST}`, { page, limit }
);
const fetchPostCommentsForm = (id: string, page: number, limit: number) => fetchBase(
  BASE_URL, `${API_POINT_POST}/${id}${API_POINT_COMMENT}`, { page, limit }
);
const fetchPostsForm = (page: number, limit: number) => fetchBase(BASE_URL, API_POINT_POST, { page, limit });

const fetchRegisterUser = (body: string) => fetchBaseSend(BASE_URL, API_POINT_USER_CREATE, METHODS_QUERY.POST, body);
const fetchUpdateUser = (id:string, body: string) => fetchBaseSend(
  BASE_URL, `${API_POINT_USER}/${id}`, METHODS_QUERY.PUT, body
);

export {
  fetchUsersForm, fetchPostsForm, fetchUserFullForm, fetchUserPostsForm, fetchRegisterUser, fetchPostCommentsForm,
  fetchPostForm, fetchUpdateUser
};
