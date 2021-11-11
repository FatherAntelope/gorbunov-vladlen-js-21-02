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

interface IUserCreateLocation {
  userStreet?: string;
  userCity?: string;
  userState?: string;
  userCountry?: string;
  userTimezone?: string;
}

export interface IUserCreate extends IUserCreateLocation {
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userTitle?: string;
  userGender?: string;
  userDateOfBirth?: string;
  registerDate?: string;
  userPhone?: string;
  userPicture?: string;
}
