import React from 'react';
import './Pagenator.css';
import Page from './page/Page';

interface IProps {
  themeDark?: boolean
}

class Pagenator extends React.Component<IProps> {
  render() {
    return (
      <div className="pagenator">
        <Page themePageDark={this.props.themeDark} pageNum={1} isActive />
        <Page themePageDark={this.props.themeDark} pageNum={2} isActive={false} />
        <Page themePageDark={this.props.themeDark} pageNum={3} isActive={false} />
        <Page themePageDark={this.props.themeDark} pageNum={4} isActive={false} />
      </div>
    );
  }
}

export default Pagenator;
