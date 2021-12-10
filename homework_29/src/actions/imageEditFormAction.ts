import { Dispatch } from 'redux';
import { RcFile } from 'antd/lib/upload';
import { EMPTY_STRING } from '../constants/common';
import { ImageEditFormAC, ImageEditFormACTypes } from '../types/redux/imageEditForm';
import { fetchUploadImage } from '../utils/imgbbApi';

const uploadImageEditAC = (file: string | RcFile | Blob) => async (dispatch: Dispatch<ImageEditFormAC>) => {
  dispatch({
    type: ImageEditFormACTypes.IMAGE_EDIT_FORM
  });

  try {
    const response = await fetchUploadImage(file);
    const image = await response.json();

    if (response.ok) {
      dispatch({
        type: ImageEditFormACTypes.IMAGE_EDIT_FORM_SUCCESS,
        payload: image.data.url
      });
    } else {
      throw new Error(`${response.status.toString()} – ${image.error.message}`);
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
