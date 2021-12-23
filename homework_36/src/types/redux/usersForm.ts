import { IResponseList, IResponseUserPreview } from '../api/localServer';

export interface IUsersFormState {
  users: IResponseList<IResponseUserPreview>;
  isLoading: boolean;
  error?: string;
}

export enum UsersFormACTypes {
  LOAD_USERS_FORM = 'USERS_FORM/LOAD_USERS_FORM',
  LOAD_USERS_FORM_SUCCESS = 'USERS_FORM/LOAD_USERS_FORM_SUCCESS',
  LOAD_USERS_FORM_ERROR = 'USERS_FORM/LOAD_USERS_FORM_ERROR'
}

interface ILoadUsersFormAC {
  type: UsersFormACTypes.LOAD_USERS_FORM;
}

interface ILoadUsersFormSuccessAC {
  type: UsersFormACTypes.LOAD_USERS_FORM_SUCCESS;
  payload: IResponseList<IResponseUserPreview>;
}

interface ILoadUsersFormErrorAC {
  type: UsersFormACTypes.LOAD_USERS_FORM_ERROR;
  payload: string | undefined;
}

export type UsersFormAC = ILoadUsersFormAC | ILoadUsersFormSuccessAC | ILoadUsersFormErrorAC;
