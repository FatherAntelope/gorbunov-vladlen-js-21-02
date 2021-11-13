import React, { useContext, ChangeEvent } from 'react';
import './ThemeCheckbox.css';
import { ThemeDarkContext } from '../../contexts/theme-checkbox/ThemeCheckboxContext';

// interface IProps {
//   checkedCheck?: boolean,
//   toggleTheme?: () => void;
// }

const ThemeCheckbox = () => {
  const themeContext = useContext(ThemeDarkContext);
  return (
    <div className={`theme-checkbox ${themeContext.themeDark ? 'theme-checkbox_theme_dark' : ''}`}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="checkbox" className="theme-checkbox__span">Тёмная тема</label>
      <input
        type="checkbox"
        checked={themeContext.themeDark}
        onChange={
          (e: ChangeEvent<HTMLInputElement>) => themeContext.toggleTheme && themeContext.toggleTheme(e.target.checked)
        }
        readOnly
        className="theme-checkbox__input"
        id="checkbox"
      />
    </div>
  );
};

ThemeCheckbox.defaultProps = {
  checkedCheck: false,
  toggleTheme: null
};

export default ThemeCheckbox;
