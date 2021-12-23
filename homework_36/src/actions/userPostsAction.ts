import { Dispatch } from 'redux';
import { AxiosResponse } from 'axios';
import { fetchUserPostsForm } from '../utils/fetchLocalServer';
import { LOADING_EMULATION_TIME } from '../constants/common';
import { UserPostsFormAC, UserPostsFormACTypes } from '../types/redux/userPostsForm';
import HttpStatuses from '../constants/httpStatuses';

const loadUserPostsFormAC = (
  userID: string, page: number, limit: number
) => async (dispatch: Dispatch<UserPostsFormAC>) => {
  dispatch({
    type: UserPostsFormACTypes.LOAD_USER_POSTS_FORM
  });

  try {
    const response: AxiosResponse = await fetchUserPostsForm(userID, page, limit);

    if (response === undefined) {
      throw new Error('503 – Service Unavailable');
    }

    if (response.status === HttpStatuses.OK) {
      const userPosts = await response.data;
      setTimeout(() => {
        dispatch({
          type: UserPostsFormACTypes.LOAD_USER_POSTS_FORM_SUCCESS,
          payload: {
            data: userPosts.data, total: userPosts.total, page: userPosts.page, limit: userPosts.limit
          }
        });
      }, LOADING_EMULATION_TIME);
    } else {
      throw new Error(`${response.status.toString()} – ${response.data.error.message}`);
    }
  } catch (e) {
    dispatch({
      type: UserPostsFormACTypes.LOAD_USER_POSTS_FORM_ERROR,
      payload: String(e)
    });
  }
};

export { loadUserPostsFormAC };
