import { Dispatch } from 'redux';
import { fetchUsersAll } from '../utils/fetchDumMyApi';
import { UsersAC, UsersACTypes } from '../types/redux/users';

const loadUsersAC = (page: number, limit: number) => (dispatch: Dispatch<UsersAC>) => {
  dispatch({
    type: UsersACTypes.LOAD_USERS,
  });
  setTimeout(() => {
    fetchUsersAll(page, limit, ((response) => dispatch({
      type: UsersACTypes.LOAD_USERS_SUCCESS,
      payload: { data: response.data, total: response.total }
    })),
    () => {
      throw new Error('Ошибка загрузки данных из сервера');
    });
  }, 500);
};

export { loadUsersAC };
