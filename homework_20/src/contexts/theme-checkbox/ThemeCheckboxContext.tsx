import React, { useState } from 'react';
import themeCheckboxContextStore from '../../stores/themeCheckboxContext';
import { toggleThemeAC } from '../../actions/themeCheckboxContext';

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
  const [themeDark, setThemeDark] = useState(localStorage.getItem('themeDark') === 'true');

  const toggleTheme = (value: boolean) => {
    themeCheckboxContextStore.on('change', () => setThemeDark(themeCheckboxContextStore.getStateIsDarkTheme()));
    toggleThemeAC(value);
    localStorage.setItem('themeDark', value.toString());
  };

  return (
    <ThemeDarkContext.Provider value={{ themeDark, toggleTheme }}>
      {children}
    </ThemeDarkContext.Provider>
  );
};

export { ThemeDarkContextProvider, ThemeDarkContext };
