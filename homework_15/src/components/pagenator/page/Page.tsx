import React from 'react';
import './Page.css';

interface IProps {
  pageNum: number;
  isActive: boolean;
}

class Page extends React.Component<IProps> {
  render() {
    return (
      <div className={`page page_theme_dark ${this.props.isActive && 'page_active'}`}>{this.props.pageNum}</div>
    );
  }
}

export default Page;
