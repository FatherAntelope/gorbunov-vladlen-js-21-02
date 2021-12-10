import React from 'react';
import { Pagination } from 'antd';
import './PaginationWrapper.scss';

interface IProps {
  pageSize: number;
  total: number;
  current: number;
  onChange: ((page: number, pageSize?: (number | undefined)) => void) | undefined;
  isDarkTheme?: boolean;
}

const PaginationWrapper = ({
  pageSize, total, current, onChange, isDarkTheme
}: IProps) => (
  <Pagination
    className={`pagination-wrapper ${isDarkTheme ? 'pagination-wrapper_theme_dark' : ''}`}
    pageSize={pageSize}
    total={total}
    current={current}
    showSizeChanger={false}
    onChange={onChange}
  />
);

PaginationWrapper.defaultProps = {
  isDarkTheme: false
};

export default PaginationWrapper;
