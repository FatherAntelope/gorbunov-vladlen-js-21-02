import { IUserFull } from '../api/dymMyApi';

export interface IUserState<T> {
  userData: T
  isLoading: boolean;
  error?: string;
}

export enum IUserACType {
  LOAD_USER_FULL = 'USER/LOAD_USER_FULL',
  LOAD_USER_FULL_SUCCESS = 'USER/LOAD_USER_FULL_SUCCESS',
  LOAD_USER_FULL_ERROR = 'USER/LOAD_USER_FULL_ERROR'
}

interface ILoadUserFullAC {
  type: IUserACType.LOAD_USER_FULL;
}

interface ILoadUserFullSuccessAC {
  type: IUserACType.LOAD_USER_FULL_SUCCESS;
  payload: IUserFull;
}

interface ILoadUserFullErrorAC {
  type: IUserACType.LOAD_USER_FULL_ERROR;
  payload: string | undefined;
}

export type UserAC = ILoadUserFullAC | ILoadUserFullSuccessAC | ILoadUserFullErrorAC;
