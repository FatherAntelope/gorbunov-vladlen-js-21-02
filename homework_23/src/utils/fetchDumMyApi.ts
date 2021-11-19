import {
  API_KEY, FIELDS_HEAD_API, BASE_URL, USER_POINT_API, USER_CREATE_POINT_API
} from '../constants/api/dummyapi';
import {
  IUserCreate
} from '../types/api/dymMyApi';

const fetchDumMyApi = (
  baseUrl: string,
  path: string,
  searchParams?: Record<string, any>,
) => {
  let url = baseUrl + path;

  if (searchParams) {
    url += `?${new URLSearchParams(searchParams)}`;
  }

  return fetch(url.toString(), {
    method: 'GET',
    headers: new Headers({
      [FIELDS_HEAD_API.API_KEY]: API_KEY
    })
  });
};

const fetchDumMyApiPost = (
  baseUrl: string,
  path: string,
  body?: string,
) => {
  const url = baseUrl + path;
  return fetch(url.toString(), {
    method: 'POST',
    headers: new Headers({
      [FIELDS_HEAD_API.API_KEY]: API_KEY,
      'Content-Type': 'application/json;charset=utf-8'
    }),
    body
  });
};

const fetchUsersAll = (
  page: number,
  limit: number,
) => fetchDumMyApi(
  BASE_URL,
  USER_POINT_API,
  {
    page,
    limit
  }
);

const fetchUserData = (
  id: string,
) => fetchDumMyApi(
  BASE_URL,
  `${USER_POINT_API}/${id}`
);

const fetchCreateUser = (
  body: string,
) => fetchDumMyApiPost(
  BASE_URL,
  USER_CREATE_POINT_API,
  body
);

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
