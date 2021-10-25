import React from "react";
import "./Footer.css";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer__body">
          <p className="footer__text">
            Контакты
          </p>
          <p className="footer__text">
            @ 2021. ИП Рыбаков О. А.
          </p>
        </div>
      </footer>
    );
  }
}

export default Footer;