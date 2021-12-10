import React from 'react';

interface IProps {
  children: React.ReactNode;
}

export interface IThemeState {
  isDarkTheme: boolean;
  handleSwitchTheme: () => void;
}

export const ThemeCheckboxContext = React.createContext<Partial<IThemeState>>({});

class ThemeCheckboxContextProvider extends React.Component<IProps, IThemeState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isDarkTheme: (localStorage.getItem('themeDark') === 'true'),
      handleSwitchTheme: this.handleSwitchTheme.bind(this)
    };
  }

  handleSwitchTheme() {
    localStorage.setItem('themeDark', (!this.state.isDarkTheme).toString());
    this.setState({ isDarkTheme: !this.state.isDarkTheme });
  }

  render() {
    return (
      <ThemeCheckboxContext.Provider
        value={{ isDarkTheme: this.state.isDarkTheme, handleSwitchTheme: this.state.handleSwitchTheme }}
      >
        {this.props.children}
      </ThemeCheckboxContext.Provider>
    );
  }
}

export { ThemeCheckboxContextProvider };
