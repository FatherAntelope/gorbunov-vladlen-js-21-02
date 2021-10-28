import React from 'react';
import './Segment.css';

interface IProps {
  children: React.ReactNode;
}

class Segment extends React.Component<IProps> {
  render() {
    return (
      <div className="segment">
        {this.props.children}
      </div>
    );
  }
}

export default Segment;
