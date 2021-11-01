import React from 'react';
import './Wrapper.css';

interface IProps {
  children: React.ReactNode;
  themeDark?: boolean;
}

const Wrapper = ({ children, themeDark }: IProps) => (
  <div className={`wrapper ${themeDark ? 'wrapper_theme_dark' : ''}`}>
    <div className="wrapper__container">
      {children}
    </div>
  </div>
);

Wrapper.defaultProps = { themeDark: false };

export default Wrapper;
