import { Dispatch } from 'redux';
import { fetchCreateUser } from '../utils/fetchDumMyApi';
import { IRegisterUserACType, RegisterUserAC } from '../types/redux/registerUser';

const registerUserAC = (body: string) => async (dispatch: Dispatch<RegisterUserAC>) => {
  try {
    const response = await fetchCreateUser(body);
    const userRegister = await response.json();
    if (response.ok) {
      dispatch({
        type: IRegisterUserACType.REGISTER_USER,
        payload: userRegister
      });
    } else {
      throw new Error(`${response.status.toString()} – ${userRegister.error}`);
    }
  } catch (e) {
    dispatch({
      type: IRegisterUserACType.REGISTER_USER_ERROR,
      payload: String(e)
    });
  }
};

export { registerUserAC };
