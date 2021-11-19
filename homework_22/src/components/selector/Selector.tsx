import React from 'react';
import './Selector.css';
import { useActions } from '../../hooks/useActions';

interface IProps {
  limit: number
  selectorValues: number[];
}

const Selector = ({
  limit, selectorValues
}: IProps) => {
  const { selectLimitAC, selectPageAC } = useActions();

  const handleChange = (e: React.BaseSyntheticEvent) => {
    selectLimitAC(Number(e.target.value));
    selectPageAC(0);
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
