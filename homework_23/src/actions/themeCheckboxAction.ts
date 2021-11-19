import { Dispatch } from 'redux';
import { IThemeCheckBoxACTypes, ThemeCheckboxAC } from '../types/redux/themeCheckbox';

const toggleThemeAC = (isDarkTheme: boolean) => (dispatch: Dispatch<ThemeCheckboxAC>) => {
  dispatch({
    type: IThemeCheckBoxACTypes.TOGGLE_THEME,
    payload: isDarkTheme
  });
};

export { toggleThemeAC };
