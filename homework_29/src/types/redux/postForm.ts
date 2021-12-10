import { IResponsePostPreview } from '../api/dumMyApi';

export interface IPostFormState {
  post: IResponsePostPreview;
  isLoading: boolean;
  error?: string;
}

export enum PostFormACTypes {
  LOAD_POST_FORM = 'POST_FORM/LOAD_POST_FORM',
  LOAD_POST_FORM_SUCCESS = 'POST_FORM/LOAD_POST_FORM_SUCCESS',
  LOAD_POST_FORM_ERROR = 'POST_FORM/LOAD_POST_FORM_ERROR'
}

interface ILoadPostFormAC {
  type: PostFormACTypes.LOAD_POST_FORM;
}

interface ILoadPostFormSuccessAC {
  type: PostFormACTypes.LOAD_POST_FORM_SUCCESS;
  payload: IResponsePostPreview;
}

interface ILoadPostFormErrorAC {
  type: PostFormACTypes.LOAD_POST_FORM_ERROR;
  payload: string | undefined;
}

export type PostFormAC = ILoadPostFormAC | ILoadPostFormSuccessAC | ILoadPostFormErrorAC;
