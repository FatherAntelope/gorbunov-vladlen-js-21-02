import React from 'react';
import './Header.scss';
import { Avatar } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { EMPTY_STRING } from '../../constants/common';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';

interface IProps {
  children: React.ReactNode;
  isDarkTheme?: boolean;
}

interface IPropsBody {
  children: React.ReactNode;
}

interface IPropsIcon {
  src: string;
  text: string;
}

interface IAuthData {
  userID: string;
  userAvatarSrc: string;
  userFirstName: string;
}

interface IPropsAuth {
  // eslint-disable-next-line react/require-default-props
  authData?: IAuthData;
  // eslint-disable-next-line react/require-default-props
  isDarkTheme?: boolean;
}

interface IPropsBurger {
  // eslint-disable-next-line react/require-default-props
  isDarkTheme?: boolean
}

const Header = ({ children, isDarkTheme }: IProps) => (
  <header className={`header ${isDarkTheme ? 'header_theme_dark' : ''} `}>
    {children}
  </header>
);

Header.defaultProps = {
  isDarkTheme: false
};

Header.Body = ({ children }: IPropsBody) => (
  <div className="header__body">
    {children}
  </div>
);

Header.Burger = ({ isDarkTheme = false }: IPropsBurger) => {
  const { isActive } = useTypedSelector((state) => state.burgerHeader);
  const { burgerHeaderSetActiveAC, burgerHeaderSetNotActiveAC } = useActions();

  const handleClick = () => {
    if (isActive) {
      burgerHeaderSetNotActiveAC();
    } else {
      burgerHeaderSetActiveAC();
    }
  };

  return (
    <div
      className={`
      header__burger ${isActive ? 'header__burger_active' : ''} ${isDarkTheme ? 'header__burger_theme_dark' : ''}
      `}
      onClick={handleClick}
    >
      <span className={`header__burger-icon ${isDarkTheme ? 'header__burger-icon_theme_dark' : ''}`} />
    </div>
  );
};

Header.Logo = ({ src, text }: IPropsIcon) => (
  <div className="header__logo">
    <div className="header__logo-img">
      <img src={src} alt="main-icon" />
    </div>
    <p className="header__logo-text">{text}</p>
  </div>
);

Header.Auth = ({ authData, isDarkTheme = false }: IPropsAuth) => {
  const [cookies, setCookies] = useCookies();
  const { clearLoginUserFormAC } = useActions();
  const localeHistory = useHistory();
  const { burgerHeaderSetNotActiveAC } = useActions();
  const burgerMenu = useTypedSelector((state) => state.burgerHeader);
  const { t } = useTranslation();

  const burgerMenuSetNotActive = () => {
    if (burgerMenu.isActive) {
      burgerHeaderSetNotActiveAC();
    }
  };

  const handleExitClick = () => {
    setCookies('user_id', EMPTY_STRING, { maxAge: -1 });
    setCookies('user_picture', EMPTY_STRING, { maxAge: -1 });
    setCookies('user_first_name', EMPTY_STRING, { maxAge: -1 });
    clearLoginUserFormAC();
    burgerMenuSetNotActive();
    localeHistory.push('/login');
  };

  const handleGoProfileClick = () => {
    burgerMenuSetNotActive();
    localeHistory.push(`/user/${cookies.user_id}`);
  };

  if (authData) {
    return (
      <div className="header__auth">
        <div className="header__auth-avatar">
          <Avatar src={authData.userAvatarSrc} alt="user-avatar" />
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
          <p
            className={`header__auth-text ${isDarkTheme ? 'header__auth-text_theme_dark' : ''} `}
            onClick={handleGoProfileClick}
          >
            {authData.userFirstName}
          </p>
        </div>
        <div className="header__auth-divider" />
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <p className="header__auth-text header__auth-text_active" onClick={handleExitClick}>
          {t('header.auth.logout')}
        </p>
      </div>
    );
  }
  return (
    <div className="header__auth">
      <Link to="/login">
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <p
          onClick={burgerMenuSetNotActive}
          className={`header__auth-text ${isDarkTheme ? 'header__auth-text_theme_dark' : ''} `}
        >
          {t('header.auth.login')}
        </p>
      </Link>
      <div className="header__auth-divider" />
      <Link to="/register">
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <p
          onClick={burgerMenuSetNotActive}
          className={`header__auth-text ${isDarkTheme ? 'header__auth-text_theme_dark' : ''} `}
        >
          {t('header.auth.registration')}
        </p>
      </Link>
    </div>
  );
};

export default Header;
