import React, { useContext } from 'react';
import './Wrapper.css';
import { ThemeDarkContext } from '../../contexts/theme-checkbox/ThemeCheckboxContext';

interface IProps {
  children: React.ReactNode;
}

const Wrapper = ({ children }: IProps) => {
  const themeDarkContext = useContext(ThemeDarkContext);
  return (
    <div className={`wrapper ${themeDarkContext.themeDark ? 'wrapper_theme_dark' : ''}`}>
      <div className="wrapper__container">
        {children}
      </div>
    </div>
  );
};

export default Wrapper;
