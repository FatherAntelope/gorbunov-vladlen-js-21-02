const BASE_SERVER_URL: string = 'http://localhost:5000/api';
enum ApiPoints {
  USER = '/user',
  POST = '/post',
  COMMENT = '/comment',
  USER_CREATE = '/user/create'
}

export { BASE_SERVER_URL, ApiPoints };
