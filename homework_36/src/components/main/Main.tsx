import React from 'react';
import './Main.scss';

interface IPaddings {
  top: number;
  bottom: number;
}

interface IProps {
  children?: React.ReactNode;
  paddings?: IPaddings;
  isDarkTheme?: boolean;
}

const Main = ({ children, paddings, isDarkTheme }: IProps) => (
  <main
    className={`main ${isDarkTheme ? 'main_theme_dark' : ''} `}
    style={{ paddingTop: `${paddings?.top}px`, paddingBottom: `${paddings?.bottom}px` }}
  >
    {children}
  </main>
);

Main.defaultProps = {
  children: undefined,
  paddings: { top: 10, bottom: 10 },
  isDarkTheme: false
};

export default Main;
