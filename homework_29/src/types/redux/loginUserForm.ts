import { IResponseUserAuth } from '../api/dumMyApi';

export interface ILoginUserFormState {
  loginUser: IResponseUserAuth;
  isLoading: boolean;
  error?: string;
}

export enum LoginUserFormACTypes {
  LOGIN_USER_FORM = 'LOGIN_USER_FORM/LOGIN_USER_FORM',
  LOGIN_USER_FORM_SUCCESS = 'LOGIN_USER_FORM/LOGIN_USER_FORM_SUCCESS',
  LOGIN_USER_FORM_ERROR = 'LOGIN_USER_FORM/LOGIN_USER_FORM_ERROR',
  LOGIN_USER_FORM_CLEAR = 'LOGIN_USER_FORM/LOGIN_USER_FORM_CLEAR',
  LOGIN_USER_FORM_SET_VALUES = 'LOGIN_USER_FORM/LOGIN_USER_FORM_SET_VALUES',
}

interface ILoginUserFormAC {
  type: LoginUserFormACTypes.LOGIN_USER_FORM;
}

interface ILoginUserFormSuccessAC {
  type: LoginUserFormACTypes.LOGIN_USER_FORM_SUCCESS;
  payload: IResponseUserAuth;
}

interface ILoginUserFormErrorAC {
  type: LoginUserFormACTypes.LOGIN_USER_FORM_ERROR;
  payload: string | undefined;
}

interface ILoginUserFormClearAC {
  type: LoginUserFormACTypes.LOGIN_USER_FORM_CLEAR;
  payload: IResponseUserAuth;
}

interface ILoginUserFormSetValuesAC {
  type: LoginUserFormACTypes.LOGIN_USER_FORM_SET_VALUES;
  payload: IResponseUserAuth;
}

export type LoginUserFormAC = ILoginUserFormAC | ILoginUserFormSuccessAC
| ILoginUserFormErrorAC | ILoginUserFormClearAC | ILoginUserFormSetValuesAC;
