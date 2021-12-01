import React, { useContext } from 'react';
import { ReadOutlined, TeamOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import Header from '../../header/Header';
import Container from '../../container/Container';
import { APPLICATION_LOGO, APPLICATION_NAME } from '../../../constants/common';
import Menu from '../../menu/Menu';
import { checkPictureAndGet } from '../../../utils/common';
import { ThemeCheckboxContext } from '../../../contexts/theme-checkbox/ThemeCheckboxContext';

interface IMenuItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

type MenuItemsType = Array<IMenuItem>;

const HeaderForm = () => {
  const [cookies] = useCookies();
  const { t } = useTranslation();
  const themeCheckboxContext = useContext(ThemeCheckboxContext);

  const menuItems: MenuItemsType = [
    { icon: <TeamOutlined />, label: t('header.menu.users'), path: '/users' },
    { icon: <ReadOutlined />, label: t('header.menu.posts'), path: '/posts' },
  ];
  return (
    <Header isDarkTheme={themeCheckboxContext.isDarkTheme}>
      <Container>
        <Header.Body>
          <Header.Burger isDarkTheme={themeCheckboxContext.isDarkTheme} />
          <Header.Logo src={APPLICATION_LOGO} text={APPLICATION_NAME} />
          <Menu isDarkTheme={themeCheckboxContext.isDarkTheme}>
            {menuItems.map((item: IMenuItem, index) => (
              <Link to={item.path} key={index}>
                <Menu.Item isDarkTheme={themeCheckboxContext.isDarkTheme} label={item.label} icon={item.icon} />
              </Link>
            ))}
          </Menu>
          <Header.Auth
            isDarkTheme={themeCheckboxContext.isDarkTheme}
            authData={
              (cookies.user_id && cookies.user_picture && cookies.user_first_name) && {
                userID: cookies.user_id,
                userAvatarSrc: checkPictureAndGet(cookies.user_picture),
                userFirstName: cookies.user_first_name
              }
            }
          />
        </Header.Body>
      </Container>
    </Header>
  );
};

export default HeaderForm;
