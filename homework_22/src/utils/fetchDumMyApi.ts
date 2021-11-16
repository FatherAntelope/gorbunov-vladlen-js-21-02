import {
  API_KEY, FIELDS_HEAD_API, BASE_URL, USER_POINT_API, USER_CREATE_POINT_API
} from '../constants/api/dummyapi';
import {
  IListResponse, IUser, IUserCreate, IUserFull
} from '../types/api/dymMyApi';

const fetchDumMyApi = <T>(
  baseUrl: string,
  path: string,
  resolveCallback: (response: T) => void,
  rejectCallback?: (response: string) => void,
  finallyCallback?: () => void,
  searchParams?: Record<string, any>,
) => {
  let url = baseUrl + path;

  if (searchParams) {
    url += `?${new URLSearchParams(searchParams)}`;
  }

  fetch(url.toString(), {
    method: 'GET',
    headers: new Headers({
      [FIELDS_HEAD_API.API_KEY]: API_KEY
    })
  })
    .then((response) => response.json())
    .then(resolveCallback)
    .catch(rejectCallback)
    .finally(finallyCallback);
};

const fetchDumMyApiPost = <T>(
  baseUrl: string,
  path: string,
  resolveCallback: (response: T) => void,
  rejectCallback?: (response: string) => void,
  finallyCallback?: () => void,
  body?: string,
) => {
  const url = baseUrl + path;
  fetch(url.toString(), {
    method: 'POST',
    headers: new Headers({
      [FIELDS_HEAD_API.API_KEY]: API_KEY,
      'Content-Type': 'application/json;charset=utf-8'
    }),
    body
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

const fetchCreateUser = (
  body: string,
  resolveCallback: (response: IUserFull) => void,
  rejectCallback?: (response: any) => void,
  finallyCallback?: () => void
) => {
  fetchDumMyApiPost(
    BASE_URL,
    USER_CREATE_POINT_API,
    ((response: IUserFull) => resolveCallback(response)),
    rejectCallback,
    finallyCallback,
    body
  );
};

const getJSONStringifyFromFormData = (formData: IUserCreate): string => JSON.stringify({
  firstName: formData.userFirstName,
  lastName: formData.userLastName,
  email: formData.userEmail,
  phone: formData.userPhone,
  picture: formData.userPicture,
  title: formData.userTitle,
  gender: formData.userGender,
  dateOfBirth: formData.userDateOfBirth,
  registerDate: new Date(),
  location: (
    formData.userStreet
    || formData.userCity
    || formData.userState
    || formData.userCountry
    || formData.userTimezone
  ) ? (
      {
        street: formData.userStreet,
        city: formData.userCity,
        state: formData.userState,
        country: formData.userCountry,
        timezone: formData.userTimezone
      }
    ) : undefined
});

export {
  fetchUsersAll, fetchUserData, fetchCreateUser, getJSONStringifyFromFormData
};
