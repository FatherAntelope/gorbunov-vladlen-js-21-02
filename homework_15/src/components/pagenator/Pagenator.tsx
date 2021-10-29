import React from 'react';
import './Pagenator.css';
import Page from './page/Page';

class Pagenator extends React.Component {
  render() {
    return (
      <div className="pagenator">
        <Page pageNum={1} isActive />
        <Page pageNum={2} isActive={false} />
        <Page pageNum={3} isActive={false} />
        <Page pageNum={4} isActive={false} />
      </div>
    );
  }
}

export default Pagenator;
