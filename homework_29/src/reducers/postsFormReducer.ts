import { IPostsFormState, PostsFormAC, PostsFormACTypes } from '../types/redux/postsForm';
import { FORM_LIMIT_POSTS } from '../constants/common';

const initialState: IPostsFormState = {
  posts: {
    data: [], total: 0, limit: FORM_LIMIT_POSTS, page: 0
  },
  isLoading: false
};

const postsFormReducer = (state = initialState, action: PostsFormAC): IPostsFormState => {
  switch (action.type) {
    case PostsFormACTypes.LOAD_POSTS_FORM:
      return { isLoading: true, posts: state.posts };
    case PostsFormACTypes.LOAD_POSTS_FORM_SUCCESS:
      return { isLoading: false, posts: action.payload };
    case PostsFormACTypes.LOAD_POSTS_FORM_ERROR:
      return { isLoading: false, posts: state.posts, error: action.payload };
    default:
      return state;
  }
};

export default postsFormReducer;
