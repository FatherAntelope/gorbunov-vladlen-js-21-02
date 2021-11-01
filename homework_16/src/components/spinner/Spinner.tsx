import React, { useContext } from 'react';
import './Spinner.css';
import { ThemeDarkContext } from '../../contexts/theme-checkbox/ThemeCheckboxContext';

const Spinner = () => {
  const themeDarkContext = useContext(ThemeDarkContext);
  return <div className={`spinner  ${themeDarkContext.themeDark ? 'spinner_theme_dark' : ''}`} />;
};

export default Spinner;
