import React from "react";
import "./Filter.css";
import ListCheck from "../list-check/ListCheck";
class Filter extends React.Component {
  render() {
    return (
      <div className="filter">
        {
          this.props.dataGroup.map((item, index) => {
            return (
              <div className="filter__group" key={index}>
                <h4 className="filter__title">{item["title"]}</h4>
                <ListCheck inputs={item["inputs"]}/>
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default Filter;