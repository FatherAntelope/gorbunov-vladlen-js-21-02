import { Dispatch } from 'redux';
import { IUserACType, UserAC } from '../types/redux/user';
import { fetchCreateUser, fetchUserData } from '../utils/fetchDumMyApi';

const loadUserFullAC = (id: string) => (dispatch: Dispatch<UserAC>) => {
  dispatch({
    type: IUserACType.LOAD_USER_FULL
  });
  setTimeout(() => {
    fetchUserData(id, ((response) => dispatch({
      type: IUserACType.LOAD_USER_FULL_SUCCESS,
      payload: response
    })),
    () => {
      throw new Error('Ошибка загрузки данных из сервера');
    });
  }, 500);
};

const registerUserFullAC = (body: string) => (dispatch: Dispatch<UserAC>) => {
  fetchCreateUser(body, ((response) => dispatch({
    type: IUserACType.REGISTER_USER_FULL,
    payload: response
  })),
  () => {
    throw new Error('Ошибка регистрации пользователя');
  });
};

export { loadUserFullAC, registerUserFullAC };
