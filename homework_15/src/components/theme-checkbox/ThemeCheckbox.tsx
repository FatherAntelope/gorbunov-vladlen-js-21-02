import React from 'react';
import './ThemeCheckbox.css';

interface IProps {
  checkedCheck?: boolean,
  toggleTheme?: () => void;
}

class ThemeCheckbox extends React.Component<IProps> {
  render(): React.ReactNode {
    return (
      <div className={`theme-checkbox ${this.props.checkedCheck ? 'theme-checkbox_theme_dark' : ''}`}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="checkbox" className="theme-checkbox__span">Тёмная тема</label>
        <input
          type="checkbox"
          checked={this.props.checkedCheck}
          onClick={this.props.toggleTheme}
          readOnly
          className="theme-checkbox__input"
          id="checkbox"
        />
      </div>

    );
  }
}

export default ThemeCheckbox;
