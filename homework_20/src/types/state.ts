import { IUser } from './api/dymMyApi';

export interface IUsersState {
  usersList: Array<IUser>;
  usersTotal: number;
  isLoading: boolean;
}
