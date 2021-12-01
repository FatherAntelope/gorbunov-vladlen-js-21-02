import React from 'react';
import './Segment.scss';

interface IProps {
  children: React.ReactNode;
  isDarkTheme?: boolean;
}

const Segment = ({ children, isDarkTheme }: IProps) => (
  <div className={`segment ${isDarkTheme ? 'segment_theme_dark' : ''} `}>{children}</div>
);

Segment.defaultProps = {
  isDarkTheme: false
};

export default Segment;
