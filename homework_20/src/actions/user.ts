import dispatcher from '../dispatcher';
import { LOAD_USER, LOAD_USER_SUCCESS } from '../constants/actions';
import { fetchUserData } from '../utils/fetchDumMyApi';

const loadUserAC = (id: string): void => {
  dispatcher.dispatch({
    type: LOAD_USER
  });
  fetchUserData(id, ((response) => dispatcher.dispatch({
    type: LOAD_USER_SUCCESS,
    payload: response
  })),
  () => {
    throw new Error('Ошибка загрузки пользователя');
  });
};

export { loadUserAC };
