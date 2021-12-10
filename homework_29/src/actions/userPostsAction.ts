import { Dispatch } from 'redux';
import { fetchUserPostsForm } from '../utils/fetchDumMyApi';
import { LOADING_EMULATION_TIME } from '../constants/common';
import { UserPostsFormAC, UserPostsFormACTypes } from '../types/redux/userPostsForm';

const loadUserPostsFormAC = (
  userID: string, page: number, limit: number
) => async (dispatch: Dispatch<UserPostsFormAC>) => {
  dispatch({
    type: UserPostsFormACTypes.LOAD_USER_POSTS_FORM
  });

  try {
    const response = await fetchUserPostsForm(userID, page, limit);
    const userPosts = await response.json();

    if (response.ok) {
      setTimeout(() => {
        dispatch({
          type: UserPostsFormACTypes.LOAD_USER_POSTS_FORM_SUCCESS,
          payload: {
            data: userPosts.data, total: userPosts.total, page: userPosts.page, limit: userPosts.limit
          }
        });
      }, LOADING_EMULATION_TIME);
    } else {
      throw new Error(`${response.status.toString()} – ${userPosts.error}`);
    }
  } catch (e) {
    dispatch({
      type: UserPostsFormACTypes.LOAD_USER_POSTS_FORM_ERROR,
      payload: String(e)
    });
  }
};

export { loadUserPostsFormAC };
