import { IResponseUserAuth, IResponseUserFull } from '../api/localServer';

export interface ISendUserFormState {
  sendUser: any;
  isLoading: boolean;
  error?: string;
}

export enum SendUserFormACTypes {
  SEND_USER_FORM = 'SEND_USER_FORM/SEND_USER_FORM',
  SEND_USER_FORM_SUCCESS = 'SEND_USER_FORM/SEND_USER_FORM_SUCCESS',
  SEND_USER_FORM_ERROR = 'SEND_USER_FORM/SEND_USER_FORM_ERROR',
  SEND_USER_FORM_CLEAR = 'SEND_USER_FORM/SEND_USER_FORM_CLEAR'
}

interface ISendUserFormAC {
  type: SendUserFormACTypes.SEND_USER_FORM;
}

interface ISendUserFormSuccessAC {
  type: SendUserFormACTypes.SEND_USER_FORM_SUCCESS;
  payload: IResponseUserAuth | IResponseUserFull;
}

interface ISendUserFormErrorAC {
  type: SendUserFormACTypes.SEND_USER_FORM_ERROR;
  payload: string | undefined;
}

interface ISendUserFormClearAC {
  type: SendUserFormACTypes.SEND_USER_FORM_CLEAR;
  payload: IResponseUserAuth | IResponseUserFull;
}

export type SendUserFormAC = ISendUserFormAC | ISendUserFormSuccessAC | ISendUserFormErrorAC | ISendUserFormClearAC;
