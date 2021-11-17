import { IUserFull } from '../api/dymMyApi';

export interface IRegisterUserState<T> {
  userData: T
  isLoading: boolean;
  error?: string;
}

export enum IRegisterUserACType {
  REGISTER_USER = 'REGISTER_USER/REGISTER_USER_FULL',
  REGISTER_USER_ERROR = 'REGISTER_USER/REGISTER_USER_FULL_ERROR',
}

interface IRegisterUserAC {
  type: IRegisterUserACType.REGISTER_USER;
  payload: IUserFull;
}

interface IRegisterUserErrorAC {
  type: IRegisterUserACType.REGISTER_USER_ERROR;
  payload: string | undefined;
}

export type RegisterUserAC = IRegisterUserAC | IRegisterUserErrorAC;
