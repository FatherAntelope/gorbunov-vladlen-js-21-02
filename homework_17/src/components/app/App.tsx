import './App.css';
import React, { useEffect, useState } from 'react';
import {
  HashRouter, Link, Route, Switch
} from 'react-router-dom';
import Wrapper from '../wrapper/Wrapper';
import Main from '../main/Main';
import Card from '../card/Card';
import Pagenator from '../pagenator/Pagenator';
import ThemeCheckbox from '../theme-checkbox/ThemeCheckbox';
import Tooltip from '../tooltip/Tooltip';
import {
  fetchUsersAll, IListResponse, IUser
} from '../../utils/fetchDumMyApi';
import Spinner from '../spinner/Spinner';
import { ThemeDarkContextProvider } from '../../contexts/theme-checkbox/ThemeCheckboxContext';
import Select from '../select/Select';
import CardUser from '../card-user/CardUser';

const App = () => {
  const [users, setUsers] = useState([] as Array<IUser>);
  const [countUsers, setCountUsers] = useState(0 as number);
  const [limit, setLimit] = useState(5 as number);
  const [page, setPage] = useState(0 as number);
  const [countPages, setCountPages] = useState(0 as number);

  const loadUsersAll = (pageApi: number, limitApi: number) => fetchUsersAll(
    pageApi,
    limitApi,
    (response: IListResponse<IUser>) => {
      setUsers(response.data);
      setCountUsers(response.total);
    },
    () => { throw new Error('Ошибка загрузки данных из сервера'); }
  );

  useEffect(() => {
    loadUsersAll(page, limit);
    setCountPages(countUsers / limit);
  }, [countUsers]);

  const selectPage = (currentPage: number): void => {
    setUsers([]);
    setPage(currentPage);
    loadUsersAll(currentPage, limit);
  };

  const selectLimit = (currentLimit: number, currentCountPages: number): void => {
    setUsers([]);
    setPage(0);
    loadUsersAll(0, currentLimit);
    setLimit(currentLimit);
    setCountPages(currentCountPages);
  };

  const renderCards = () => (
    users.length !== 0
      ? (
        <div className="row">
          {users.map((item: IUser) => (
            <div className="col-6" key={item.id}>
              <Tooltip textInfo={item.id}>
                <Link to={`/user/${item.id}`}>
                  <Card
                    imgUrl={item.picture}
                    cardUserId={item.id}
                    cardUserTitle={item.title}
                    cardUserFirstName={item.firstName}
                    cardUserLastName={item.lastName}
                  />
                </Link>
              </Tooltip>
            </div>
          ))}
        </div>
      )
      : <Spinner />
  );

  const renderPagenatorAndThemeCheck = () => (
    <div className="row row_space-between">
      {
        countPages !== 0 && (
          <Pagenator page={page} selectPage={selectPage} countPages={countPages} />
        )
      }
      <Select
        countUsers={countUsers}
        selectLimit={selectLimit}
        selectorValues={[5, 10, 20, 30, 40, 50]}
      />
      <ThemeCheckbox />
    </div>
  );

  return (
    <ThemeDarkContextProvider>
      <div className="App">
        <Wrapper>
          <HashRouter>
            <Switch>
              <Route path="/user/:id">
                <Main headerTitle="Пользователь">
                  <CardUser />
                </Main>
              </Route>
              <Route path="/">
                <Main headerTitle="Пользователи">
                  {renderCards()}
                  {renderPagenatorAndThemeCheck()}
                </Main>
              </Route>
            </Switch>
          </HashRouter>
        </Wrapper>
      </div>
    </ThemeDarkContextProvider>
  );
};

export default App;
