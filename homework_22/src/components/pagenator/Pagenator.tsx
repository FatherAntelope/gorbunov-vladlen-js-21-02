import React, { useEffect, useState } from 'react';
import './Pagenator.css';
import Page from './page/Page';
import { useActions } from '../../hooks/useActions';

interface IProps {
  countPages: number;
  page: number
  themeDark?: boolean;
}

const Pagenator = ({
  countPages, page, themeDark
}: IProps) => {
  const { selectPageAC } = useActions();
  let pagesArr: number[] = [];
  const [pages, setPages] = useState([] as number[]);

  useEffect(() => {
    for (let i = 0; i < countPages; i += 1) {
      pagesArr.push(i);
    }
    setPages(pagesArr);
    pagesArr = [];
  }, [countPages]);

  const handleClick = (e: React.BaseSyntheticEvent): void => {
    if (Number(e.target.dataset.page || page) !== page) {
      selectPageAC(Number(e.target.dataset.page));
    }
    e.preventDefault();
  };

  return (
    <div className="pagenator" onClick={handleClick}>
      {
        pages.map((item, index) => {
          if (
            (index >= 0 && index <= 2)
            || (index >= page - 1 && index <= page + 1)
            || (index >= Math.floor(countPages) - 2 && index <= Math.floor(countPages))
          ) {
            return (
              <Page
                themePageDark={themeDark}
                pageNum={item}
                isActive={item === page}
                key={item}
              />
            );
          }
          if (
            (index === page + 2 || index === page - 2)
            || (page === 0 && index === page + 3)
            || (page === Math.floor(countPages) && index === Math.floor(countPages) - 3)
          ) {
            return <span key={item} className="pagenator__dotes">&hellip;</span>;
          }
          return undefined;
        })
      }
    </div>
  );
};

Pagenator.defaultProps = {
  themeDark: false
};

export default Pagenator;
