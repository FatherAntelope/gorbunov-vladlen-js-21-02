import React from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';

interface IProps {
  children: React.ReactNode;
}

export interface IThemeState {
  isDarkTheme: boolean;
  toggleTheme: (value: boolean) => void;
}

const ThemeDarkContext = React.createContext<Partial<IThemeState>>({
  isDarkTheme: false,
  toggleTheme: () => {}
});

const ThemeDarkContextProvider = ({ children }: IProps) => {
  const { isDarkTheme } = useTypedSelector((state) => state.themeCheckbox);
  const { toggleThemeAC } = useActions();

  const toggleTheme = (value: boolean) => {
    localStorage.setItem('themeDark', value.toString());
    toggleThemeAC(value);
  };

  return (
    <ThemeDarkContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemeDarkContext.Provider>
  );
};

export { ThemeDarkContextProvider, ThemeDarkContext };
