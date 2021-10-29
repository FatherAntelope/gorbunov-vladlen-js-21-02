import React from 'react';
import './ThemeCheckbox.css';

class ThemeCheckbox extends React.Component {
  render() {
    return (
      <div className="theme-checkbox theme-checkbox_dark_theme">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="checkbox" className="theme-checkbox__span">Тёмная тема</label>
        <input type="checkbox" defaultChecked={false} className="theme-checkbox__input" id="checkbox" />
      </div>
    );
  }
}

export default ThemeCheckbox;
