import React, { useState } from 'react';

interface IProps {
  children: React.ReactNode;
}

export interface IThemeState {
  themeDark: boolean;
  toggleTheme: (value: boolean) => void;
}

const ThemeDarkContext = React.createContext<Partial<IThemeState>>({
  themeDark: false,
  toggleTheme: () => {}
});

const ThemeDarkContextProvider = ({ children }: IProps) => {
  const [themeDark] = useState(localStorage.getItem('themeDark') === 'true');

  const toggleTheme = (value: boolean) => {
    localStorage.setItem('themeDark', value.toString());
  };

  return (
    <ThemeDarkContext.Provider value={{ themeDark, toggleTheme }}>
      {children}
    </ThemeDarkContext.Provider>
  );
};

export { ThemeDarkContextProvider, ThemeDarkContext };
