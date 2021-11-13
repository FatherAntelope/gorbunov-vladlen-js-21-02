import React, { useContext, useState } from 'react';
import './Tooltip.css';
import { ThemeDarkContext } from '../../contexts/theme-checkbox/ThemeCheckboxContext';

interface IProps {
  children: React.ReactNode;
  textInfo: string;
}

const Tooltip = ({ children, textInfo }: IProps) => {
  const [hovered, setHovered] = useState(false as boolean);
  const themeDarkContext = useContext(ThemeDarkContext);

  const mouseOver = (e: React.SyntheticEvent): void => {
    setHovered(true);
    e.stopPropagation();
  };

  const mouseOut = (e: React.SyntheticEvent): void => {
    setHovered(false);
    e.stopPropagation();
  };

  return (
  // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <div className="tooltip" onMouseOver={mouseOver} onMouseOut={mouseOut}>
      {
        hovered && (
          <div className={`tooltip__info ${themeDarkContext.themeDark ? 'tooltip__info_theme_dark' : ''}`}>
            {textInfo}
          </div>
        )
      }
      {children}
    </div>
  );
};

export default Tooltip;
