import { Dispatch } from 'redux';
import { IUserACType, UserAC } from '../types/redux/user';
import { fetchUserData } from '../utils/fetchDumMyApi';

const loadUserFullAC = (id: string) => async (dispatch: Dispatch<UserAC>) => {
  dispatch({
    type: IUserACType.LOAD_USER_FULL
  });
  try {
    const response = await fetchUserData(id);
    const user = await response.json();
    if (response.ok) {
      setTimeout(() => {
        dispatch({
          type: IUserACType.LOAD_USER_FULL_SUCCESS,
          payload: user
        });
      }, 500);
    } else {
      throw new Error(`${response.status.toString()} – ${user.error}`);
    }
  } catch (e) {
    dispatch({
      type: IUserACType.LOAD_USER_FULL_ERROR,
      payload: String(e)
    });
  }
};

export { loadUserFullAC };
