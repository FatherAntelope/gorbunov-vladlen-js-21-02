import React, { useContext } from 'react';
import './Main.css';
import { ThemeDarkContext } from '../../contexts/theme-checkbox/ThemeCheckboxContext';

interface IProps {
  headerTitle: string;
  children: React.ReactNode;
}

const Main = ({ headerTitle, children } :IProps) => {
  const themeDarkContext = useContext(ThemeDarkContext);
  return (
    <main className="main">
      <h2 className={`main__header ${themeDarkContext.themeDark ? 'main__header_theme_dark' : ''}`}>
        {headerTitle}
      </h2>
      {children}
    </main>
  );
};

export default Main;
