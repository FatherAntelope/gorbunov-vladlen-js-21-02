import React from 'react';
import './Menu.scss';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';

interface IProps {
  children: React.ReactNode;
  isDarkTheme?: boolean;
}

interface IPropItem {
  // eslint-disable-next-line react/require-default-props
  isDarkTheme?: boolean;
  // eslint-disable-next-line react/require-default-props
  icon?: React.ReactNode;
  label: string;
}

const Menu = ({ children, isDarkTheme }: IProps) => {
  const { isActive } = useTypedSelector((state) => state.burgerHeader);
  return (
    <nav
      className={`
      menu ${isActive ? 'menu_mobile-slide_active' : ''} ${isDarkTheme ? 'menu_theme_dark' : ''}
      `}
    >
      {children}
    </nav>
  );
};

Menu.defaultProps = {
  isDarkTheme: false
};

Menu.Item = ({ isDarkTheme, icon, label }: IPropItem) => {
  const { burgerHeaderSetNotActiveAC } = useActions();
  const { isActive } = useTypedSelector((state) => state.burgerHeader);

  const burgerMenuSetNotActive = () => {
    if (isActive) {
      burgerHeaderSetNotActiveAC();
    }
  };

  return (
    <div
      onClick={burgerMenuSetNotActive}
      className={`menu__item ${isDarkTheme ? 'menu__item_theme_dark' : ''} `}
    >
      {icon}
      <span style={{ marginLeft: 7 }}>{label}</span>
    </div>
  );
};

export default Menu;
