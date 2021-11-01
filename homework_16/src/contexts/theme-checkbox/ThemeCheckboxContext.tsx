import React from 'react';

interface IProps {
  children: React.ReactNode;
}

export interface IThemeState {
  themeDark: boolean;
  toggleTheme: () => void;
}

const { Provider, Consumer } = React.createContext<Partial<IThemeState>>({});

class ThemeCheckboxContextProvider extends React.Component<IProps, IThemeState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      themeDark: false,
      toggleTheme: this.toggleTheme.bind(this)
    };
  }

  toggleTheme() {
    this.setState({ themeDark: !this.state.themeDark });
  }

  render(): React.ReactNode {
    return (
      <Provider value={{ themeDark: this.state.themeDark, toggleTheme: this.state.toggleTheme }}>
        {this.props.children}
      </Provider>
    );
  }
}

export { ThemeCheckboxContextProvider, Consumer as ThemeCheckboxContextConsumer };
