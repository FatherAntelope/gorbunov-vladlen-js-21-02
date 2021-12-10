interface IApiHeads {
  APP_ID: string;
  CONTENT_TYPE: string
}

const API_KEY: string = '617d424dbe5f9771bd07c1b0';

const BASE_URL: string = 'https://dummyapi.io/data/v1';
const API_POINT_USER: string = '/user';
const API_POINT_USER_CREATE: string = '/user/create';
const API_POINT_POST: string = '/post';
const API_POINT_COMMENT: string = '/comment';

const METHODS_QUERY = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT'
};

const API_HEADS: IApiHeads = {
  APP_ID: 'app-id',
  CONTENT_TYPE: 'Content-Type'
};

enum ContentTypes {
  JSON = 'application/json;charset=utf-8',
}

export {
  BASE_URL, API_KEY, API_HEADS, API_POINT_USER, API_POINT_POST, METHODS_QUERY, API_POINT_USER_CREATE, ContentTypes,
  API_POINT_COMMENT
};
