import dispatcher from '../dispatcher';
import { LOAD_USERS, LOAD_USERS_SUCCESS } from '../constants/actions';
import { fetchUsersAll } from '../utils/fetchDumMyApi';

const loadUsersAC = (page: number, limit: number): void => {
  dispatcher.dispatch({
    type: LOAD_USERS
  });
  fetchUsersAll(page, limit, ((response) => dispatcher.dispatch({
    type: LOAD_USERS_SUCCESS,
    payload: { data: response.data, total: response.total }
  })),
  () => {
    throw new Error('Ошибка загрузки данных из сервера');
  });
};

export { loadUsersAC };
