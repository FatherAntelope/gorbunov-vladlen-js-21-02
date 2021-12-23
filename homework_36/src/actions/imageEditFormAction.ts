import { Dispatch } from 'redux';
import { AxiosResponse } from 'axios';
import { EMPTY_STRING } from '../constants/common';
import { ImageEditFormAC, ImageEditFormACTypes } from '../types/redux/imageEditForm';
import { fetchUpdateUser } from '../utils/fetchLocalServer';
import HttpStatuses from '../constants/httpStatuses';

const uploadImageEditAC = (id: string, file: Blob) => async (dispatch: Dispatch<ImageEditFormAC>) => {
  dispatch({
    type: ImageEditFormACTypes.IMAGE_EDIT_FORM
  });

  try {
    const response: AxiosResponse = await fetchUpdateUser(id, { picture: file });

    if (response === undefined) {
      throw new Error('503 – Service Unavailable');
    }

    if (response.status === HttpStatuses.OK) {
      const image = await response.data;
      dispatch({
        type: ImageEditFormACTypes.IMAGE_EDIT_FORM_SUCCESS,
        payload: image.data.picture
      });
    } else {
      throw new Error(`${response.status.toString()} – ${response.data.error.message}`);
    }
  } catch (e) {
    dispatch({
      type: ImageEditFormACTypes.IMAGE_EDIT_FORM_ERROR,
      payload: String(e)
    });
  }
};

const clearImageEditFormAC = () => (dispatch: Dispatch<ImageEditFormAC>) => {
  dispatch({
    type: ImageEditFormACTypes.IMAGE_EDIT_FORM_CLEAR,
    payload: EMPTY_STRING
  });
};

export { uploadImageEditAC, clearImageEditFormAC };
