import React from 'react';
import './Wrapper.scss';
import { useTypedSelector } from '../../hooks/useTypedSelector';

interface IProps {
  // eslint-disable-next-line react/require-default-props
  children?: React.ReactNode;
}

const Wrapper = ({ children }: IProps) => {
  const { isActive } = useTypedSelector((state) => state.burgerHeader);
  return (
    <div className={`wrapper ${isActive ? 'wrapper_scroll_hidden' : ''}`}>
      <div className="wrapper__grid">
        {children}
      </div>
    </div>
  );
};

export default Wrapper;
