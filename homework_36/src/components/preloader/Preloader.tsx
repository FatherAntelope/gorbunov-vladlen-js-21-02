import React from 'react';
import './Preloader.scss';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface IProps {
  isDarkTheme?: boolean
}

const Preloader = ({ isDarkTheme }: IProps) => (
  <div className="preloader">
    <Spin
      indicator={
        <LoadingOutlined className={`preloader__spin ${isDarkTheme ? 'preloader__spin_theme_dark' : ''}`} spin />
      }
    />
  </div>
);

Preloader.defaultProps = {
  isDarkTheme: false
};

export default Preloader;
