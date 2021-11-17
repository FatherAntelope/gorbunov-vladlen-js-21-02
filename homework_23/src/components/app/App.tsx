import './App.css';
import React, { useContext, useEffect, useState } from 'react';
import {
  Route, Switch, useHistory, useLocation
} from 'react-router-dom';
import { Menu } from 'antd';
import { ThemeDarkContext } from '../../contexts/theme-checkbox/ThemeCheckboxContext';
import Wrapper from '../wrapper/Wrapper';
import Main from '../main/Main';
import CardUser from '../card-user/CardUser';
import Pagenator from '../pagenator/Pagenator';
import Selector from '../selector/Selector';
import ThemeCheckbox from '../theme-checkbox/ThemeCheckbox';
import UsersForm from '../forms/UsersForm';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import RegisterUserForm from '../forms/RegisterUserForm';

const App = () => {
  const { countPages, currentPage } = useTypedSelector((state) => state.pagenator);
  const { users, isLoading } = useTypedSelector((state) => state.users);
  const { currentLimit } = useTypedSelector((state) => state.selector);
  const { setCountPagesAC } = useActions();

  const locationHook = useLocation();
  const locationHistoryHook = useHistory();
  const themeDarkContext = useContext(ThemeDarkContext);

  const renderPagenatorAndThemeCheck = () => {
    useEffect(() => {
      if (users.total !== 0) {
        setCountPagesAC(Number(users.total / currentLimit));
      }
    }, [isLoading, currentLimit]);

    return (
      <div className="row row_space-between">
        {
          countPages !== 0 && (
            <Pagenator
              themeDark={themeDarkContext.isDarkTheme}
              page={currentPage}
              countPages={countPages}
            />
          )
        }
        <Selector
          limit={currentLimit}
          selectorValues={[5, 10, 20, 30, 40, 50]}
        />
        <ThemeCheckbox themeDark={themeDarkContext.isDarkTheme} toggleTheme={themeDarkContext.toggleTheme} />
      </div>
    );
  };

  const renderMenu = () => {
    const itemsMenu: Array<any> = [
      { label: 'Пользователи', path: '/' },
      { label: 'Регистрация', path: '/registration' }
    ];
    const [currPath, setCurrPath] = useState(locationHook.pathname);

    useEffect(() => {
      setCurrPath(locationHook.pathname);
    }, [locationHook]);

    const handleClick = (e: any) => {
      locationHistoryHook.push(e.key);
    };

    return (
      <Menu
        selectedKeys={[currPath]}
        onClick={handleClick}
        mode="horizontal"
        theme={themeDarkContext.isDarkTheme ? 'dark' : 'light'}
      >
        {itemsMenu.map((item) => (
          <Menu.Item key={item.path}>{item.label}</Menu.Item>
        ))}
      </Menu>
    );
  };

  return (
    <div className="App">
      <Wrapper themeDark={themeDarkContext.isDarkTheme}>
        {renderMenu()}
        <Switch>
          <Route exact path="/registration">
            <Main themeDark={themeDarkContext.isDarkTheme} headerTitle="Регистрация пользователя">
              <RegisterUserForm />
            </Main>
          </Route>
          <Route exact path="/user/:id">
            <Main themeDark={themeDarkContext.isDarkTheme} headerTitle="Пользователь">
              <CardUser themeDark={themeDarkContext.isDarkTheme} />
            </Main>
          </Route>
          <Route exact path="/">
            <Main themeDark={themeDarkContext.isDarkTheme} headerTitle="Пользователи">
              <UsersForm selectPage={currentPage} limit={currentLimit} themeDark={themeDarkContext.isDarkTheme} />
              {renderPagenatorAndThemeCheck()}
            </Main>
          </Route>
        </Switch>
      </Wrapper>
    </div>
  );
};

export default App;
