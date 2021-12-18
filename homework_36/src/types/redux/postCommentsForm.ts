import { IResponseCommentPreview, IResponseList } from '../api/localServer';

export interface IPostCommentsFormState {
  postComments: IResponseList<IResponseCommentPreview>;
  isLoading: boolean;
  error?: string;
}

export enum PostCommentsFormACTypes {
  LOAD_POST_COMMENTS_FORM = 'POST_COMMENTS_FORM/LOAD_POST_COMMENTS_FORM',
  LOAD_POST_COMMENTS_FORM_SUCCESS = 'POST_COMMENTS_FORM/LOAD_POST_COMMENTS_FORM_SUCCESS',
  LOAD_POST_COMMENTS_FORM_ERROR = 'POST_COMMENTS_FORM/LOAD_POST_COMMENTS_FORM_ERROR'
}

interface ILoadPostCommentsFormAC {
  type: PostCommentsFormACTypes.LOAD_POST_COMMENTS_FORM;
}

interface ILoadPostCommentsFormSuccessAC {
  type: PostCommentsFormACTypes.LOAD_POST_COMMENTS_FORM_SUCCESS;
  payload: IResponseList<IResponseCommentPreview>;
}

interface ILoadPostCommentsFormErrorAC {
  type: PostCommentsFormACTypes.LOAD_POST_COMMENTS_FORM_ERROR;
  payload: string | undefined;
}

export type PostCommentsFormAC = ILoadPostCommentsFormAC | ILoadPostCommentsFormSuccessAC
| ILoadPostCommentsFormErrorAC;
