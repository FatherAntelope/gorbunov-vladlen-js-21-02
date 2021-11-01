import React from 'react';
import './Main.css';

interface IProps {
  headerTitle: string;
  children: React.ReactNode;
  themeDark?: boolean;
}

const Main = ({ headerTitle, children, themeDark } :IProps) => (
  <main className="main">
    <h2 className={`main__header ${themeDark ? 'main__header_theme_dark' : ''}`}>
      {headerTitle}
    </h2>
    {children}
  </main>
);

Main.defaultProps = { themeDark: false };

export default Main;
