import { IUserACType, IUserState, UserAC } from '../types/redux/user';
import { IUserFull } from '../types/api/dymMyApi';

const initialState: IUserState<IUserFull | undefined> = {
  userData: undefined,
  isLoading: true
};

const userReducer = (
  state = initialState, action: UserAC
): IUserState<IUserFull | undefined> => {
  switch (action.type) {
    case IUserACType.LOAD_USER_FULL:
      return { isLoading: true, userData: state.userData };
    case IUserACType.LOAD_USER_FULL_SUCCESS:
      return { isLoading: false, userData: action.payload };
    case IUserACType.LOAD_USER_FULL_ERROR:
      return { isLoading: false, userData: state.userData, error: action.payload };
    default: return state;
  }
};

export default userReducer;
