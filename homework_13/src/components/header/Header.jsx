import React from "react";
import "./Header.css";

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <div className="header__body">
          <h2 className="header__text">
            Интернет-магазин "Не только красивое"
          </h2>
        </div>
      </header>
    )
  }
}

export default Header;