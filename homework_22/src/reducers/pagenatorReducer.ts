import { IPagenatorState, PagenatorAC, PagenatorACTypes } from '../types/redux/pagenator';

const initialState: IPagenatorState = {
  currentPage: 0,
  countPages: 0
};

const pagenatorReducer = (state = initialState, action: PagenatorAC) => {
  switch (action.type) {
    case PagenatorACTypes.SELECT_PAGE:
      return { currentPage: action.payload, countPages: state.countPages };
    case PagenatorACTypes.SET_COUNT_PAGES:
      return { currentPage: state.currentPage, countPages: action.payload };
    default:
      return state;
  }
};

export default pagenatorReducer;
