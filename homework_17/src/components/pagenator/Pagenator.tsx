import React, { useContext, useEffect, useState } from 'react';
import './Pagenator.css';
import Page from './page/Page';
import { ThemeDarkContext } from '../../contexts/theme-checkbox/ThemeCheckboxContext';

interface IProps {
  countPages: number;
  page: number
  selectPage: (currentPage: number) => void;
}

const Pagenator = ({ countPages, selectPage, page }: IProps) => {
  let pagesArr: number[] = [];
  const [pages, setPages] = useState([] as number[]);
  const themeDarkContext = useContext(ThemeDarkContext);

  useEffect(() => {
    for (let i = 0; i < countPages; i += 1) {
      pagesArr.push(i);
    }
    setPages(pagesArr);
    pagesArr = [];
  }, [countPages]);

  const handleClick = (e: React.BaseSyntheticEvent): void => {
    if (Number(e.target.dataset.page || page) !== page) {
      // setCurrentPage(Number(e.target.dataset.page || currentPage));
      selectPage(Number(e.target.dataset.page));
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
            isActive={item === page}
            key={item}
          />
        ))
      }
    </div>
  );
};

export default Pagenator;
