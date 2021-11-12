import React, { ChangeEvent } from 'react';
import './ThemeCheckbox.css';

interface IProps {
  themeDark?: boolean,
  toggleTheme?: (value: boolean) => void;
}

const ThemeCheckbox = ({ themeDark, toggleTheme }: IProps) => (
  <div className={`theme-checkbox ${themeDark ? 'theme-checkbox_theme_dark' : ''}`}>
    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
    <label htmlFor="checkbox" className="theme-checkbox__span">Тёмная тема</label>
    <input
      type="checkbox"
      checked={themeDark}
      onChange={
          (e: ChangeEvent<HTMLInputElement>) => toggleTheme && toggleTheme(e.target.checked)
        }
      readOnly
      className="theme-checkbox__input"
      id="checkbox"
    />
  </div>
);

ThemeCheckbox.defaultProps = {
  themeDark: false,
  toggleTheme: null
};

export default ThemeCheckbox;
