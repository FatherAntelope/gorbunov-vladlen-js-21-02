import { FORM_LIMIT_USER_POSTS } from '../constants/common';
import { IUserPostsFormState, UserPostsFormAC, UserPostsFormACTypes } from '../types/redux/userPostsForm';

const initialState: IUserPostsFormState = {
  userPosts: {
    data: [], total: 0, limit: FORM_LIMIT_USER_POSTS, page: 0
  },
  isLoading: false
};

const userPostsFormReducer = (state = initialState, action: UserPostsFormAC): IUserPostsFormState => {
  switch (action.type) {
    case UserPostsFormACTypes.LOAD_USER_POSTS_FORM:
      return { isLoading: true, userPosts: state.userPosts };
    case UserPostsFormACTypes.LOAD_USER_POSTS_FORM_SUCCESS:
      return { isLoading: false, userPosts: action.payload };
    case UserPostsFormACTypes.LOAD_USER_POSTS_FORM_ERROR:
      return { isLoading: false, userPosts: state.userPosts, error: action.payload };
    default:
      return state;
  }
};

export default userPostsFormReducer;
