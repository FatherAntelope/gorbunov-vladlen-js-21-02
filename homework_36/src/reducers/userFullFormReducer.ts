import { IUserFullFormState, UserFullFormAC, UserFullFormACTypes } from '../types/redux/userFullForm';
import { EMPTY_STRING } from '../constants/common';

const initialState: IUserFullFormState = {
  user: {
    id: EMPTY_STRING,
    gender: EMPTY_STRING,
    phone: EMPTY_STRING,
    picture: EMPTY_STRING,
    email: EMPTY_STRING,
    registerDate: EMPTY_STRING,
    dateOfBirth: EMPTY_STRING,
    dateOfBirthOriginal: EMPTY_STRING,
    fullName: EMPTY_STRING,
    title: EMPTY_STRING
  },
  isLoading: false
};

const userFullFormReducer = (state = initialState, action: UserFullFormAC): IUserFullFormState => {
  switch (action.type) {
    case UserFullFormACTypes.LOAD_USER_FULL_FORM:
      return { isLoading: true, user: state.user };
    case UserFullFormACTypes.LOAD_USER_FULL_FORM_SUCCESS:
      return { isLoading: false, user: action.payload };
    case UserFullFormACTypes.LOAD_USER_FULL_FORM_ERROR:
      return { isLoading: false, user: state.user, error: action.payload };
    default:
      return state;
  }
};

export default userFullFormReducer;
