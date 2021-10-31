import React from 'react';
import './Wrapper.css';

interface IProps {
  children: React.ReactNode;
}

class Wrapper extends React.Component<IProps> {
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
