import { Dispatch } from 'redux';
import { fetchUsersAll } from '../utils/fetchDumMyApi';
import { UsersAC, UsersACTypes } from '../types/redux/users';

const loadUsersAC = (page: number, limit: number) => async (dispatch: Dispatch<UsersAC>) => {
  dispatch({
    type: UsersACTypes.LOAD_USERS,
  });
  try {
    const response = await fetchUsersAll(page, limit);
    const users = await response.json();
    if (response.ok) {
      setTimeout(() => {
        dispatch({
          type: UsersACTypes.LOAD_USERS_SUCCESS,
          payload: { data: users.data, total: users.total }
        });
      }, 500);
    } else {
      throw new Error(`${response.status.toString()} – ${users.error}`);
    }
  } catch (e) {
    dispatch({
      type: UsersACTypes.LOAD_USERS_ERROR,
      payload: String(e)
    });
  }
};

export { loadUsersAC };
