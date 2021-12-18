import { Dispatch } from 'redux';
import { AxiosResponse } from 'axios';
import { LOADING_EMULATION_TIME } from '../constants/common';
import { PostFormAC, PostFormACTypes } from '../types/redux/postForm';
import { fetchPostForm } from '../utils/fetchLocalServer';
import HttpStatuses from '../constants/httpStatuses';

const loadPostFormAC = (id: string) => async (dispatch: Dispatch<PostFormAC>) => {
  dispatch({
    type: PostFormACTypes.LOAD_POST_FORM
  });

  try {
    const response: AxiosResponse = await fetchPostForm(id);

    if (response === undefined) {
      throw new Error('503 – Service Unavailable');
    }

    if (response.status === HttpStatuses.OK) {
      const post = await response.data;
      setTimeout(() => {
        dispatch({
          type: PostFormACTypes.LOAD_POST_FORM_SUCCESS,
          payload: post.data
        });
      }, LOADING_EMULATION_TIME);
    } else {
      throw new Error(`${response.status.toString()} – ${response.data.error.message}`);
    }
  } catch (e) {
    dispatch({
      type: PostFormACTypes.LOAD_POST_FORM_ERROR,
      payload: String(e)
    });
  }
};

export { loadPostFormAC };
