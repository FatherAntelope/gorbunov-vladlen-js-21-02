import { IListResponse, IUser } from '../api/dymMyApi';

export interface IUsersState {
  users: IListResponse<IUser>;
  isLoading: boolean;
  error?: string;
}

export enum UsersACTypes {
  LOAD_USERS = 'USERS/LOAD_USERS',
  LOAD_USERS_SUCCESS = 'USERS/LOAD_USERS_SUCCESS',
  LOAD_USERS_ERROR = 'USERS/LOAD_USERS_ERROR'
}

interface ILoadUsersAC {
  type: UsersACTypes.LOAD_USERS;
}

interface ILoadUsersSuccessAC {
  type: UsersACTypes.LOAD_USERS_SUCCESS;
  payload: IListResponse<IUser>;
}

interface ILoadUsersErrorAC {
  type: UsersACTypes.LOAD_USERS_ERROR;
  payload: string | undefined;
}

export type UsersAC = ILoadUsersAC | ILoadUsersSuccessAC | ILoadUsersErrorAC;
