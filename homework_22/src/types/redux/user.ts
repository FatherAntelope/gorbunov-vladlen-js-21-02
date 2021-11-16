import { IUserFull } from '../api/dymMyApi';

export interface IUserState<T> {
  userData: T
  isLoading: boolean;
}

export enum IUserACType {
  LOAD_USER_FULL = 'USER/LOAD_USER_FULL',
  LOAD_USER_FULL_SUCCESS = 'USER/LOAD_USER_FULL_SUCCESS',
  REGISTER_USER_FULL = 'USER/REGISTER_USER_FULL'
}

interface ILoadUserFullAC {
  type: IUserACType.LOAD_USER_FULL;
}

interface ILoadUserFullACSuccess {
  type: IUserACType.LOAD_USER_FULL_SUCCESS;
  payload: IUserFull;
}

interface IRegisterUserFullAC {
  type: IUserACType.REGISTER_USER_FULL;
  payload: IUserFull;
}

export type UserAC = ILoadUserFullAC | ILoadUserFullACSuccess | IRegisterUserFullAC;
