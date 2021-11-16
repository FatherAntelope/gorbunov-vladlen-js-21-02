import { IThemeCheckBoxACTypes, IThemeCheckboxState, ThemeCheckboxAC } from '../types/redux/themeCheckbox';

const initialState = {
  isDarkTheme: localStorage.getItem('themeDark') === 'true'
};

const themeCheckboxReducer = (state = initialState, action: ThemeCheckboxAC): IThemeCheckboxState => {
  switch (action.type) {
    case IThemeCheckBoxACTypes.TOGGLE_THEME:
      return { isDarkTheme: action.payload };
    default:
      return state;
  }
};

export default themeCheckboxReducer;
