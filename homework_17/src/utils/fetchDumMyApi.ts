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

interface IUserLocation {
  street: string;
  city: string;
  state: string;
  country: string;
  timezone: string;
}

export interface IUserFull {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  dateOfBirth: string;
  registerDate: string;
  phone: string;
  picture: string;
  location: IUserLocation;
}

const fetchDumMyApi = <T>(
  baseUrl: string,
  path: string,
  resolveCallback: (response: T) => void,
  rejectCallback?: (response: string) => void,
  finallyCallback?: () => void,
  searchParams?: Record<string, any>
) => {
  let url = baseUrl + path;

  if (searchParams) {
    url += `?${new URLSearchParams(searchParams)}`;
  }

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

const fetchUsersAll = (
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

const fetchUserData = (
  id: string,
  resolveCallback: (response: IUserFull) => void,
  rejectCallback?: (response: any) => void,
  finallyCallback?: () => void
) => fetchDumMyApi(
  BASE_URL,
  `${USER_POINT_API}/${id}`,
  ((response: IUserFull) => resolveCallback(response)),
  rejectCallback,
  finallyCallback
);

export { fetchUsersAll, fetchUserData };
