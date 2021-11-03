import {
  API_KEY, FIELDS_HEAD_API, BASE_URL, USER_POINT_API
} from '../constants/api/dummyapi';

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

const fetchDumMyApi = <T>(
  baseUrl: string,
  path: string,
  resolveCallback: (response: T) => void,
  rejectCallback?: (response: string) => void,
  finallyCallback?: () => void,
  searchParams?: Record<string, any>
) => {
  const url = new URL(path, baseUrl);

  searchParams && Object.entries(searchParams).forEach((param) => {
    url.searchParams.append(param[0], param[1].toString());
  });
  fetch(url.toString(), {
    method: 'GET',
    headers: new Headers({
      [FIELDS_HEAD_API.API_KEY]: API_KEY
    }),
  })
    .then((response) => response.json())
    .then(resolveCallback)
    .catch(rejectCallback)
    .finally(finallyCallback);
};

const fetchAllUsers = (
  page: number,
  limit: number,
  resolveCallback: (response: IListResponse<IUser>) => void,
  rejectCallback?: (response: any) => void,
  finallyCallback?: () => void
) => fetchDumMyApi(
  BASE_URL,
  USER_POINT_API,
  ((response: IListResponse<IUser>) => resolveCallback(response)),
  rejectCallback,
  finallyCallback,
  {
    page,
    limit
  }
);

export { fetchAllUsers, fetchDumMyApi };
