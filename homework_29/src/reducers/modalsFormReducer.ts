import { IModalsFormState, ModalsFormAC, ModalsFormACTypes } from '../types/redux/modalsForm';

const initialState: IModalsFormState = {};

const modalsFormReducer = (state = initialState, action: ModalsFormAC): IModalsFormState => {
  switch (action.type) {
    case ModalsFormACTypes.OPEN_MODALS_FORM:
      return { ...state, ...action.payload };
    case ModalsFormACTypes.CLOSE_MODALS_FORM:
      return action.payload;
    default:
      return state;
  }
};

export default modalsFormReducer;
