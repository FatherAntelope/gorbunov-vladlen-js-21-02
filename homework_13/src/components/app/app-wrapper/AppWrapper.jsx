import React from "react";
import "./AppWrapper.css";

class AppWrapper extends React.Component {
  render() {
    return (
      <div className="app-wrapper">
        <div className="app-wrapper__container">
          <div className="app-wrapper__grid">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default AppWrapper;