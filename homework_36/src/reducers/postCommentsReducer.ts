import { FORM_LIMIT_POST_COMMENTS } from '../constants/common';
import { IPostCommentsFormState, PostCommentsFormAC, PostCommentsFormACTypes } from '../types/redux/postCommentsForm';

const initialState: IPostCommentsFormState = {
  postComments: {
    data: [], total: 0, limit: FORM_LIMIT_POST_COMMENTS, page: 0
  },
  isLoading: false
};

const postCommentsReducer = (
  state = initialState, action: PostCommentsFormAC
): IPostCommentsFormState => {
  switch (action.type) {
    case PostCommentsFormACTypes.LOAD_POST_COMMENTS_FORM:
      return { isLoading: true, postComments: state.postComments };
    case PostCommentsFormACTypes.LOAD_POST_COMMENTS_FORM_SUCCESS:
      return { isLoading: false, postComments: action.payload };
    case PostCommentsFormACTypes.LOAD_POST_COMMENTS_FORM_ERROR:
      return { isLoading: false, postComments: state.postComments, error: action.payload };
    default:
      return state;
  }
};

export default postCommentsReducer;
