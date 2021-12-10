import { IResponseList, IResponsePostPreview } from '../api/dumMyApi';

export interface IUserPostsFormState {
  userPosts: IResponseList<IResponsePostPreview>;
  isLoading: boolean;
  error?: string;
}

export enum UserPostsFormACTypes {
  LOAD_USER_POSTS_FORM = 'USER_POSTS_FORM/LOAD_USER_POSTS_FORM',
  LOAD_USER_POSTS_FORM_SUCCESS = 'USER_POSTS_FORM/LOAD_USER_POSTS_FORM_SUCCESS',
  LOAD_USER_POSTS_FORM_ERROR = 'USER_POSTS_FORM/LOAD_USER_POSTS_FORM_ERROR'
}

interface ILoadUserPostsFormAC {
  type: UserPostsFormACTypes.LOAD_USER_POSTS_FORM;
}

interface ILoadUserPostsFormSuccessAC {
  type: UserPostsFormACTypes.LOAD_USER_POSTS_FORM_SUCCESS;
  payload: IResponseList<IResponsePostPreview>;
}

interface ILoadUserPostsFormErrorAC {
  type: UserPostsFormACTypes.LOAD_USER_POSTS_FORM_ERROR;
  payload: string | undefined;
}

export type UserPostsFormAC = ILoadUserPostsFormAC | ILoadUserPostsFormSuccessAC | ILoadUserPostsFormErrorAC;
