import { Dispatch } from 'redux';
import { ISelectorACTypes, SelectorAC } from '../types/redux/selector';

const selectLimitAC = (limit: number) => (dispatch: Dispatch<SelectorAC>) => {
  dispatch({
    type: ISelectorACTypes.SELECT_LIMIT,
    payload: limit
  });
};

export { selectLimitAC };
