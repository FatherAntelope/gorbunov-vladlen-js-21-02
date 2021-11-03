import React, { useContext, useEffect, useState } from 'react';
import './Pagenator.css';
import Page from './page/Page';
import { ThemeDarkContext } from '../../contexts/theme-checkbox/ThemeCheckboxContext';

interface IProps {
  countPages: number;
  selectPage: (currentPage: number) => void;
}

const Pagenator = ({ countPages, selectPage }: IProps) => {
  let pagesArr: number[] = [];

  const [currentPage, setCurrentPage] = useState(Number(selectPage) as number);
  const [pages, setPages] = useState([] as number[]);

  const themeDarkContext = useContext(ThemeDarkContext);

  useEffect(() => {
    for (let i = 0; i < countPages; i += 1) {
      pagesArr.push(i);
    }
    setPages(pagesArr);
    pagesArr = [];
  }, [currentPage, countPages]);

  useEffect(() => {
    setCurrentPage(0);
  }, [countPages]);

  const handleClick = (e: React.BaseSyntheticEvent): void => {
    if (Number(e.target.dataset.page || currentPage) !== currentPage) {
      setCurrentPage(Number(e.target.dataset.page || currentPage));
      selectPage(e.target.dataset.page);
    }
    e.preventDefault();
  };

  return (
    <div className="pagenator" onClick={handleClick}>
      {
        pages.map((item) => (
          <Page
            themePageDark={themeDarkContext.themeDark}
            pageNum={item}
            isActive={item === currentPage}
            key={item}
          />
        ))
      }
    </div>
  );
};

export default Pagenator;
