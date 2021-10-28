import React from 'react';
import './Wrapper.css';

interface IWrapper {
  children: React.ReactNode;
}

class Wrapper extends React.Component<IWrapper> {
  render() {
    return (
      <div className="wrapper">
        <div className="wrapper__container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Wrapper;
