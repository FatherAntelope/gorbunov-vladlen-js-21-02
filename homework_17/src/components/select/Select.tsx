import React from 'react';
import './Select.css';

interface IProps {
  selectorValues: number[];
  countUsers: number;
  selectLimit: (currentPage: number, countPages: number) => void;
}

const Select = ({
  selectorValues, countUsers, selectLimit
}: IProps) => {
  const handleChange = (e: React.BaseSyntheticEvent) => {
    selectLimit(Number(e.target.value), countUsers / Number(e.target.value));
    e.preventDefault();
  };

  return (
    <select className="select" onChange={handleChange}>
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

export default Select;
