import { ISelectorACTypes, ISelectorState, SelectorAC } from '../types/redux/selector';

const initialState = {
  currentLimit: 10
};

const selectorReducer = (state = initialState, action: SelectorAC): ISelectorState => {
  switch (action.type) {
    case ISelectorACTypes.SELECT_LIMIT:
      return { currentLimit: action.payload };
    default:
      return state;
  }
};

export default selectorReducer;
