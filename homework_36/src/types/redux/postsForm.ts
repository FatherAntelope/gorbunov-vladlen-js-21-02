import { IResponseList, IResponsePostPreview } from '../api/localServer';

export interface IPostsFormState {
  posts: IResponseList<IResponsePostPreview>;
  isLoading: boolean;
  error?: string;
}

export enum PostsFormACTypes {
  LOAD_POSTS_FORM = 'POSTS_FORM/LOAD_POSTS_FORM',
  LOAD_POSTS_FORM_SUCCESS = 'POSTS_FORM/LOAD_POSTS_FORM_SUCCESS',
  LOAD_POSTS_FORM_ERROR = 'POSTS_FORM/LOAD_POSTS_FORM_ERROR'
}

interface ILoadPostsFormAC {
  type: PostsFormACTypes.LOAD_POSTS_FORM;
}

interface ILoadPostsFormSuccessAC {
  type: PostsFormACTypes.LOAD_POSTS_FORM_SUCCESS;
  payload: IResponseList<IResponsePostPreview>;
}

interface ILoadPostsFormErrorAC {
  type: PostsFormACTypes.LOAD_POSTS_FORM_ERROR;
  payload: string | undefined;
}

export type PostsFormAC = ILoadPostsFormAC | ILoadPostsFormSuccessAC | ILoadPostsFormErrorAC;
