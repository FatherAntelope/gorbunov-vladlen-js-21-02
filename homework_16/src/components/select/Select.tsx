import React, { useState } from 'react';
import './Select.css';

interface IProps {
  selectorValues: number[];
  limit: number;
  countUsers: number;
  selectLimit: (currentPage: number, countPages: number) => void;
}

const Select = ({
  selectorValues, limit, countUsers, selectLimit
}: IProps) => {
  const [, setCurrentLimit] = useState(limit);

  const handleChange = (e: React.BaseSyntheticEvent) => {
    // eslint-disable-next-line react/no-unused-state
    setCurrentLimit(Number(e.target.value));
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
