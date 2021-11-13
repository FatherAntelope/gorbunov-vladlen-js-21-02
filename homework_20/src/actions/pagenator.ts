import dispatcher from '../dispatcher';
import { SELECT_PAGE, SET_COUNT_PAGES } from '../constants/actions';

const selectPageAC = (page: number): void => {
  dispatcher.dispatch({
    type: SELECT_PAGE,
    payload: page
  });
};

const setCountPagesAC = (countPages: number): void => {
  dispatcher.dispatch({
    type: SET_COUNT_PAGES,
    payload: countPages
  });
};

export { selectPageAC, setCountPagesAC };
