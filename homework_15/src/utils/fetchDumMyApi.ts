import { API_KEY, USER_POINT_URL, FIELDS_HEAD_API } from '../constants/api/dummyapi';

export interface IListResponse<T> {
  data: Array<T>;
  page: number;
  limit: number;
  total: number;
}

export interface IUser {
  id: string;
  title?: string;
  firstName?: string;
  lastName?: string;
  picture?: string;
}

const fetchDumMyApi = (
  resolve: (response: IListResponse<IUser>) => void,
  reject: (response: any) => void,
  page: number,
  limit: number
) => fetch(`${USER_POINT_URL}?page=${page.toString()}&limit=${limit.toString()}`, {
  method: 'GET',
  headers: new Headers({
    [FIELDS_HEAD_API.API_KEY]: API_KEY
  })
})
  .then((response) => response.json())
  .then((response: IListResponse<IUser>) => resolve(response))
  .catch(reject);

export { fetchDumMyApi };
