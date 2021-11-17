import { Dispatch } from 'redux';
import { PagenatorAC, PagenatorACTypes } from '../types/redux/pagenator';

const selectPageAC = (page: number) => (dispatch: Dispatch<PagenatorAC>) => {
  dispatch({
    type: PagenatorACTypes.SELECT_PAGE,
    payload: page
  });
};

const setCountPagesAC = (countPages: number) => (dispatch: Dispatch<PagenatorAC>) => {
  dispatch({
    type: PagenatorACTypes.SET_COUNT_PAGES,
    payload: countPages
  });
};

export { selectPageAC, setCountPagesAC };
