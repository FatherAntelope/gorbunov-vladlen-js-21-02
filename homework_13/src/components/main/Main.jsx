import React from "react";
import "./Main.css";

class Main extends React.Component {
  render() {
    return (
      <main className="main">
        {this.props.children}
      </main>
    );
  }
}

export default Main;