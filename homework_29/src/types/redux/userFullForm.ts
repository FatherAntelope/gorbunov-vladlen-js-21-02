import { IResponseUserFull } from '../api/dumMyApi';

export interface IUserFullFormState {
  user: IResponseUserFull;
  isLoading: boolean;
  error?: string;
}

export enum UserFullFormACTypes {
  LOAD_USER_FULL_FORM = 'USER_FULL_FORM/LOAD_USER_FULL_FORM',
  LOAD_USER_FULL_FORM_SUCCESS = 'USER_FULL_FORM/LOAD_USER_FULL_FORM_SUCCESS',
  LOAD_USER_FULL_FORM_ERROR = 'USER_FULL_FORM/LOAD_USER_FULL_FORM_ERROR',
}

interface ILoadUserFullFormAC {
  type: UserFullFormACTypes.LOAD_USER_FULL_FORM;
}

interface ILoadUserFullFormSuccessAC {
  type: UserFullFormACTypes.LOAD_USER_FULL_FORM_SUCCESS;
  payload: IResponseUserFull;
}

interface ILoadUserFullFormErrorAC {
  type: UserFullFormACTypes.LOAD_USER_FULL_FORM_ERROR;
  payload: string | undefined;
}

export type UserFullFormAC = ILoadUserFullFormAC | ILoadUserFullFormSuccessAC | ILoadUserFullFormErrorAC;
