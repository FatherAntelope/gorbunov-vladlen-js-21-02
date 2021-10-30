import React from 'react';
import './Wrapper.css';

interface IProps {
  children: React.ReactNode;
  themeDark?: boolean;
}

class Wrapper extends React.Component<IProps> {
  render() {
    return (
      <div className={`wrapper ${this.props.themeDark ? 'wrapper_theme_dark' : ''}`}>
        <div className="wrapper__container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Wrapper;
