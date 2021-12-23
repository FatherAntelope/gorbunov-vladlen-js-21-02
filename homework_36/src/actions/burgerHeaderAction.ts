import { Dispatch } from 'redux';
import { BurgerHeaderAC, BurgerHeaderACTypes } from '../types/redux/burgerHeader';

const burgerHeaderSetActiveAC = () => (dispatch: Dispatch<BurgerHeaderAC>) => {
  dispatch({
    type: BurgerHeaderACTypes.BURGER_HEADER_SET_ACTIVE,
    payload: { isActive: true }
  });
};

const burgerHeaderSetNotActiveAC = () => (dispatch: Dispatch<BurgerHeaderAC>) => {
  dispatch({
    type: BurgerHeaderACTypes.BURGER_HEADER_SET_NOT_ACTIVE,
    payload: { isActive: false }
  });
};

export { burgerHeaderSetActiveAC, burgerHeaderSetNotActiveAC };
