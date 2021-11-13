import dispatcher from '../dispatcher';
import { LOAD_USER, LOAD_USER_SUCCESS, REGISTER_USER } from '../constants/actions';
import { fetchCreateUser, fetchUserData } from '../utils/fetchDumMyApi';
import { IUserFull } from '../types/api/dymMyApi';

const loadUserAC = (id: string): void => {
  dispatcher.dispatch({
    type: LOAD_USER
  });
  fetchUserData(id, (response: IUserFull) => dispatcher.dispatch({
    type: LOAD_USER_SUCCESS,
    payload: response
  }),
  () => {
    throw new Error('Ошибка загрузки пользователя');
  });
};

const registerUserAC = (body: string): void => {
  fetchCreateUser(body, (response: IUserFull) => dispatcher.dispatch({
    type: REGISTER_USER,
    payload: response.id
  }),
  () => {
    throw new Error('Ошибка отправки данных на сервер');
  });
};

export { loadUserAC, registerUserAC };
