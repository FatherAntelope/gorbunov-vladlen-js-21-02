import React from "react";
import "./Sidebar.css";

class Sidebar extends React.Component {
  render() {
    return (
      <aside className="sidebar">
        <div className="sidebar__body">
          {this.props.children}
        </div>
      </aside>
    );
  }
}

export default Sidebar;