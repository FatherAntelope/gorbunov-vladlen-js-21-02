import React from 'react';
import './ThemeCheckbox.css';

interface IProps {
  checkedCheck?: boolean,
  toggleTheme?: () => void;
}

const ThemeCheckbox = ({ checkedCheck, toggleTheme }: IProps) => (
  <div className={`theme-checkbox ${checkedCheck ? 'theme-checkbox_theme_dark' : ''}`}>
    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
    <label htmlFor="checkbox" className="theme-checkbox__span">Тёмная тема</label>
    <input
      type="checkbox"
      checked={checkedCheck}
      onClick={toggleTheme}
      readOnly
      className="theme-checkbox__input"
      id="checkbox"
    />
  </div>
);

ThemeCheckbox.defaultProps = {
  checkedCheck: false,
  toggleTheme: null
};

export default ThemeCheckbox;
