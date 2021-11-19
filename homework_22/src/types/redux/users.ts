import { IListResponse, IUser } from '../api/dymMyApi';

export interface IUsersState {
  users: IListResponse<IUser>;
  isLoading: boolean;
}

export enum UsersACTypes {
  LOAD_USERS = 'USERS/LOAD_USERS',
  LOAD_USERS_SUCCESS = 'USERS/LOAD_USERS_SUCCESS'
}

interface ILoadUsersAC {
  type: UsersACTypes.LOAD_USERS;
}

interface ILoadUsersSuccessAC {
  type: UsersACTypes.LOAD_USERS_SUCCESS;
  payload: IListResponse<IUser>;
}

export type UsersAC = ILoadUsersAC | ILoadUsersSuccessAC;
