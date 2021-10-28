import React from 'react';
import './Segment.css';

interface ISegment {
  children: React.ReactNode;
}

class Segment extends React.Component<ISegment> {
  render() {
    return (
      <div className="segment">
        {this.props.children}
      </div>
    );
  }
}

export default Segment;
