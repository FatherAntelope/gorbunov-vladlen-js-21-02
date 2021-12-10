import { EMPTY_STRING } from '../constants/common';
import { ISendUserFormState, SendUserFormAC, SendUserFormACTypes } from '../types/redux/sendUserForm';

const initialState: ISendUserFormState = {
  sendUser: {
    id: EMPTY_STRING,
    picture: EMPTY_STRING,
    firstName: EMPTY_STRING,
  },
  isLoading: false
};

const sendUserFormReducer = (
  state = initialState, action: SendUserFormAC
): ISendUserFormState => {
  switch (action.type) {
    case SendUserFormACTypes.SEND_USER_FORM:
      return { isLoading: true, sendUser: state.sendUser };
    case SendUserFormACTypes.SEND_USER_FORM_SUCCESS:
      return { isLoading: false, sendUser: action.payload };
    case SendUserFormACTypes.SEND_USER_FORM_ERROR:
      return { isLoading: false, sendUser: state.sendUser, error: action.payload };
    case SendUserFormACTypes.SEND_USER_FORM_CLEAR:
      return { isLoading: false, sendUser: action.payload };
    default:
      return state;
  }
};

export default sendUserFormReducer;
