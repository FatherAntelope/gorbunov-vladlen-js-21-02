interface IApiHeads {
  APP_ID: string;
  CONTENT_TYPE: string
}

const BASE_URL: string = 'https://dummyapi.io/data/v1';

enum ApiPoints {
  USER = '/user',
  POST = '/post',
  COMMENT = '/comment',
  USER_CREATE = '/user/create'
}

enum PageOptions {
  MIN = 0
}

enum LimitOptions {
  MAX = 20,
  MIN = 5
}

const API_HEADS: IApiHeads = {
  APP_ID: 'app-id',
  CONTENT_TYPE: 'Content-Type'
};

export {
  BASE_URL, API_HEADS, ApiPoints, PageOptions, LimitOptions
};
