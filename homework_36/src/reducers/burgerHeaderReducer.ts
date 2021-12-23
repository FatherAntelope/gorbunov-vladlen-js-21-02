import { BurgerHeaderAC, BurgerHeaderACTypes, IBurgerHeaderState } from '../types/redux/burgerHeader';

const initialState: IBurgerHeaderState = {
  isActive: false
};

const burgerHeaderReducer = (state = initialState, action: BurgerHeaderAC): IBurgerHeaderState => {
  switch (action.type) {
    case BurgerHeaderACTypes.BURGER_HEADER_SET_ACTIVE:
      return action.payload;
    case BurgerHeaderACTypes.BURGER_HEADER_SET_NOT_ACTIVE:
      return action.payload;
    default:
      return state;
  }
};

export default burgerHeaderReducer;
