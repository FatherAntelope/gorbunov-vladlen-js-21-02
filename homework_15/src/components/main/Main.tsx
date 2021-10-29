import React from 'react';
import './Main.css';

interface IProps {
  headerTitle: string;
  children: React.ReactNode;
}

class Main extends React.Component<IProps> {
  render() {
    return (
      <main className="main">
        <h2 className="main__header main__header_theme_dark">
          {this.props.headerTitle}
        </h2>
        {this.props.children}
      </main>
    );
  }
}

export default Main;
