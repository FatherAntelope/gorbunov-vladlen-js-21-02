import { IUserFull } from '../types/api/dymMyApi';
import { IRegisterUserACType, IRegisterUserState, RegisterUserAC } from '../types/redux/registerUser';

const initialState: IRegisterUserState<IUserFull | undefined> = {
  userData: undefined,
  isLoading: true
};

const registerUserAC = (
  state = initialState,
  action: RegisterUserAC
): IRegisterUserState<IUserFull | undefined> => {
  switch (action.type) {
    case IRegisterUserACType.REGISTER_USER:
      return { isLoading: false, userData: action.payload };
    case IRegisterUserACType.REGISTER_USER_ERROR:
      return { isLoading: false, userData: state.userData, error: action.payload };
    default: return state;
  }
};

export default registerUserAC;
