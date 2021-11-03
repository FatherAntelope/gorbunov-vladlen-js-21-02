interface IFieldsHeadApi {
  [key: string]: string;
}

const BASE_URL: string = 'https://dummyapi.io/data/v1';
const USER_POINT_API: string = '/user';

const API_KEY: string = '617d424dbe5f9771bd07c1b0';

const FIELDS_HEAD_API: IFieldsHeadApi = {
  API_KEY: 'app-id'
};

export {
  BASE_URL, API_KEY, FIELDS_HEAD_API, USER_POINT_API
};
