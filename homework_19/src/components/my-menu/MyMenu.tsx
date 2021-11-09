import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import React from 'react';

const MyMenu = () => {
  const locationMenu = useLocation();
  const urlPath: string[] = [`#${locationMenu.pathname}`];

  // useEffect(() => {}, [locationMenu]);

  return (
    <Menu defaultSelectedKeys={urlPath} mode="horizontal" theme="dark">
      <Menu.Item key="#/">
        <Link to="/">Пользователи</Link>
      </Menu.Item>
      <Menu.Item key="#/registration">
        <Link to="/registration">Регистрация</Link>
      </Menu.Item>
    </Menu>
  );
};

export default MyMenu;
