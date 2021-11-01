import React from 'react';
import './Spinner.css';

interface IProps {
  themeDark?: boolean
}

const Spinner = ({ themeDark }: IProps) => <div className={`spinner  ${themeDark ? 'spinner_theme_dark' : ''}`} />;

Spinner.defaultProps = { themeDark: false };

export default Spinner;
