import React, { useState } from 'react';
import './Tooltip.css';

interface IProps {
  children: React.ReactNode;
  textInfo: string;
  themeDark?: boolean;
}

const Tooltip = ({ children, textInfo, themeDark }: IProps) => {
  const [hovered, setHovered] = useState(false as boolean);

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
          <div className={`tooltip__info ${themeDark ? 'tooltip__info_theme_dark' : ''}`}>
            {textInfo}
          </div>
        )
      }
      {children}
    </div>
  );
};

Tooltip.defaultProps = {
  themeDark: false
};

export default Tooltip;
