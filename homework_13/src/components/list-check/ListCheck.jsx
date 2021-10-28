import React from "react";
import "./ListCheck.css";

class ListCheck extends React.Component {
  render() {
    return (
      <div className="list-check">
        {
          this.props.inputs.map((item) => {
            return (
              <div className="list-check__item" key={item["id"]}>
                <input type="checkbox" id={item["id"]}/>
                <label htmlFor={item["id"]}> {item["label"]} </label>
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default ListCheck;