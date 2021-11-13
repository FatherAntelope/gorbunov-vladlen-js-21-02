import { IUser, IUserFull } from './api/dymMyApi';

export interface IUsersState {
  usersList: Array<IUser>;
  usersTotal: number;
  isLoading: boolean;
}

export interface IUserState {
  userData: IUserFull;
  isLoading: boolean;
}
