import React from 'react';
import './Spinner.css';

interface IProps {
  themeDark?: boolean
}

class Spinner extends React.Component<IProps> {
  render() {
    return (
      <div className={`spinner  ${this.props.themeDark ? 'spinner_theme_dark' : ''}`} />
    );
  }
}

export default Spinner;
