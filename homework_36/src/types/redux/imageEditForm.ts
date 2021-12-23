export interface IImageEditFormState {
  editImageURL: string;
  isLoading: boolean;
  error?: string;
}

export enum ImageEditFormACTypes {
  IMAGE_EDIT_FORM = 'IMAGE_EDIT_FORM/IMAGE_EDIT_FORM',
  IMAGE_EDIT_FORM_SUCCESS = 'IMAGE_EDIT_FORM/IMAGE_EDIT_FORM_SUCCESS',
  IMAGE_EDIT_FORM_ERROR = 'IMAGE_EDIT_FORM/IMAGE_EDIT_FORM_ERROR',
  IMAGE_EDIT_FORM_CLEAR = 'IMAGE_EDIT_FORM/IMAGE_EDIT_FORM_CLEAR'
}

interface IImageEditFormAC {
  type: ImageEditFormACTypes.IMAGE_EDIT_FORM;
}

interface IImageEditFormSuccessAC {
  type: ImageEditFormACTypes.IMAGE_EDIT_FORM_SUCCESS;
  payload: string;
}

interface IImageEditFormErrorAC {
  type: ImageEditFormACTypes.IMAGE_EDIT_FORM_ERROR;
  payload: string | undefined;
}

interface IImageEditFormClearAC {
  type: ImageEditFormACTypes.IMAGE_EDIT_FORM_CLEAR;
  payload: string;
}

export type ImageEditFormAC = IImageEditFormAC | IImageEditFormSuccessAC | IImageEditFormErrorAC
| IImageEditFormClearAC;
