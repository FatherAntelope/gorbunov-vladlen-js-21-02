import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';

interface IProps {
  setCurrPath: (arg: string) => void;
  currPath: string;
}

const MyMenu = ({ currPath, setCurrPath }: IProps) => {
  // const [currPath, setCurrPath] = useState('#/' as string);
  const currLocation = useLocation();

  useEffect(() => {
    setCurrPath(`#${currLocation.pathname}`);
  }, []);

  const handleClick = (e: any) => {
    setCurrPath(e.key);
  };

  return (
    <Menu
      defaultSelectedKeys={[`${currPath}`]}
      selectedKeys={[`${currPath}`]}
      onClick={handleClick}
      mode="horizontal"
      theme="dark"
    >
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
