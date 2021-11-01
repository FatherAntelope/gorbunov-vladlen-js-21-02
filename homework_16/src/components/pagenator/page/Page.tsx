import React from 'react';
import './Page.css';

interface IProps {
  pageNum: number;
  isActive: boolean;
  themePageDark?: boolean;
}

const Page = ({ pageNum, isActive, themePageDark }: IProps) => (
  <div
    className={`page ${themePageDark ? 'page_theme_dark' : ''} ${isActive && 'page_active'}`}
    data-page={pageNum}
  >
    {pageNum + 1}
  </div>
);

Page.defaultProps = { themePageDark: false };

export default Page;
