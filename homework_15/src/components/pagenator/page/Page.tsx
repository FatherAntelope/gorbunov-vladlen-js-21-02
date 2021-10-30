import React from 'react';
import './Page.css';

interface IProps {
  pageNum: number;
  isActive: boolean;
  themePageDark?: boolean;
}

class Page extends React.Component<IProps> {
  render() {
    return (
      <div
        className={`
          page 
          ${this.props.themePageDark ? 'page_theme_dark' : ''} 
          ${this.props.isActive && 'page_active'}
        `}
        data-page={this.props.pageNum}
      >
        {this.props.pageNum + 1}
      </div>
    );
  }
}

export default Page;
