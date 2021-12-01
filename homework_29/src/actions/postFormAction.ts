import { Dispatch } from 'redux';
import { LOADING_EMULATION_TIME } from '../constants/common';
import { PostFormAC, PostFormACTypes } from '../types/redux/postForm';
import { fetchPostForm } from '../utils/fetchDumMyApi';

const loadPostFormAC = (id: string) => async (dispatch: Dispatch<PostFormAC>) => {
  dispatch({
    type: PostFormACTypes.LOAD_POST_FORM
  });

  try {
    const response = await fetchPostForm(id);
    const post = await response.json();

    if (response.ok) {
      setTimeout(() => {
        dispatch({
          type: PostFormACTypes.LOAD_POST_FORM_SUCCESS,
          payload: post
        });
      }, LOADING_EMULATION_TIME);
    } else {
      throw new Error(`${response.status.toString()} – ${post.error}`);
    }
  } catch (e) {
    dispatch({
      type: PostFormACTypes.LOAD_POST_FORM_ERROR,
      payload: String(e)
    });
  }
};

export { loadPostFormAC };
