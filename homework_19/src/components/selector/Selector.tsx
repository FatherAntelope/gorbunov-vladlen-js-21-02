import React from 'react';
import './Selector.css';

interface IProps {
  limit: number
  selectorValues: number[];
  countUsers: number;
  selectLimit: (currentPage: number, countPages: number) => void;
}

const Selector = ({
  limit, selectorValues, countUsers, selectLimit
}: IProps) => {
  const handleChange = (e: React.BaseSyntheticEvent) => {
    selectLimit(Number(e.target.value), countUsers / Number(e.target.value));
    e.preventDefault();
  };

  return (
    <select value={limit} className="select" onChange={handleChange}>
      {
        selectorValues.map((item: number, index: number) => (
          <option value={item} key={index}>
            {item}
          </option>
        ))
      }
    </select>
  );
};

export default Selector;
