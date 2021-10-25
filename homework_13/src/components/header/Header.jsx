import React from "react";
import "./Header.css";

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <div className="header__body">
          <h2 className="header__text">
            {this.props.children}
          </h2>
        </div>
      </header>
    )
  }
}

export default Header;