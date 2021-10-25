import React from "react";
import "./Footer.css";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer__body">
          <p className="footer__text">
            {this.props.info}
          </p>
          <p className="footer__text">
            {this.props.copy}
          </p>
        </div>
      </footer>
    );
  }
}

export default Footer;