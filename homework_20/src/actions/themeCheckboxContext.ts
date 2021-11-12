import dispatcher from '../dispatcher';
import { TOGGLE_THEME } from '../constants/actions';

const toggleThemeAC = (isDarkTheme: boolean): void => {
  dispatcher.dispatch({
    type: TOGGLE_THEME,
    payload: isDarkTheme
  });
};

export { toggleThemeAC };
