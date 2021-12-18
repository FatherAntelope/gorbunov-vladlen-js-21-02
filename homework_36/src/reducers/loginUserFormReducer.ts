import { EMPTY_STRING } from '../constants/common';
import { ILoginUserFormState, LoginUserFormAC, LoginUserFormACTypes } from '../types/redux/loginUserForm';

const initialState: ILoginUserFormState = {
  loginUser: {
    id: EMPTY_STRING,
    picture: EMPTY_STRING,
    firstName: EMPTY_STRING,
  },
  isLoading: false
};

const loginUserFormReducer = (state = initialState, action: LoginUserFormAC): ILoginUserFormState => {
  switch (action.type) {
    case LoginUserFormACTypes.LOGIN_USER_FORM:
      return { isLoading: true, loginUser: state.loginUser };
    case LoginUserFormACTypes.LOGIN_USER_FORM_SUCCESS:
      return { isLoading: false, loginUser: action.payload };
    case LoginUserFormACTypes.LOGIN_USER_FORM_ERROR:
      return { isLoading: false, loginUser: state.loginUser, error: action.payload };
    case LoginUserFormACTypes.LOGIN_USER_FORM_CLEAR:
      return { isLoading: false, loginUser: action.payload };
    case LoginUserFormACTypes.LOGIN_USER_FORM_SET_VALUES:
      return { isLoading: false, loginUser: action.payload };
    default:
      return state;
  }
};

export default loginUserFormReducer;
