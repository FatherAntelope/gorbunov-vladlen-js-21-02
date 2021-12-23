import { Dispatch } from 'redux';
import { AxiosResponse } from 'axios';
import { fetchPostCommentsForm } from '../utils/fetchLocalServer';
import { LOADING_EMULATION_TIME } from '../constants/common';
import { PostCommentsFormAC, PostCommentsFormACTypes } from '../types/redux/postCommentsForm';
import HttpStatuses from '../constants/httpStatuses';

const loadPostCommentsFormAC = (
  postID: string, page: number, limit: number
) => async (dispatch: Dispatch<PostCommentsFormAC>) => {
  dispatch({
    type: PostCommentsFormACTypes.LOAD_POST_COMMENTS_FORM
  });

  try {
    const response: AxiosResponse = await fetchPostCommentsForm(postID, page, limit);

    if (response === undefined) {
      throw new Error('503 – Service Unavailable');
    }

    if (response.status === HttpStatuses.OK) {
      const postComments = await response.data;
      setTimeout(() => {
        dispatch({
          type: PostCommentsFormACTypes.LOAD_POST_COMMENTS_FORM_SUCCESS,
          payload: {
            data: postComments.data, total: postComments.total, page: postComments.page, limit: postComments.limit
          }
        });
      }, LOADING_EMULATION_TIME);
    } else {
      throw new Error(`${response.status.toString()} – ${response.data.error.message}`);
    }
  } catch (e) {
    dispatch({
      type: PostCommentsFormACTypes.LOAD_POST_COMMENTS_FORM_ERROR,
      payload: String(e)
    });
  }
};

export { loadPostCommentsFormAC };
