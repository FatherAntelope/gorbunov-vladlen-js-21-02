import { EMPTY_STRING } from '../constants/common';
import { IPostFormState, PostFormAC, PostFormACTypes } from '../types/redux/postForm';

const initialState: IPostFormState = {
  post: {
    id: EMPTY_STRING,
    text: EMPTY_STRING,
    image: EMPTY_STRING,
    publishDate: EMPTY_STRING,
    owner: {
      id: EMPTY_STRING,
      picture: EMPTY_STRING,
      firstName: EMPTY_STRING,
      lastName: EMPTY_STRING,
      title: EMPTY_STRING
    }
  },
  isLoading: false
};

const postFormReducer = (state = initialState, action: PostFormAC): IPostFormState => {
  switch (action.type) {
    case PostFormACTypes.LOAD_POST_FORM:
      return { isLoading: true, post: state.post };
    case PostFormACTypes.LOAD_POST_FORM_SUCCESS:
      return { isLoading: false, post: action.payload };
    case PostFormACTypes.LOAD_POST_FORM_ERROR:
      return { isLoading: false, post: state.post, error: action.payload };
    default:
      return state;
  }
};

export default postFormReducer;
