import './App.css';
import React, { useEffect, useState } from 'react';
import Wrapper from '../wrapper/Wrapper';
import Main from '../main/Main';
import Card from '../card/Card';
import Pagenator from '../pagenator/Pagenator';
import ThemeCheckbox from '../theme-checkbox/ThemeCheckbox';
import Tooltip from '../tooltip/Tooltip';
import { fetchAllUsers, IListResponse, IUser } from '../../utils/fetchDumMyApi';
import Spinner from '../spinner/Spinner';
import { ThemeDarkContextProvider } from '../../contexts/theme-checkbox/ThemeCheckboxContext';
import Select from '../select/Select';

const App = () => {
  const [users, setUsers] = useState([] as Array<IUser>);
  const [countUsers, setCountUsers] = useState(0 as number);
  const [limit, setLimit] = useState(5 as number);
  const [page, setPage] = useState(0 as number);
  const [countPages, setCountPages] = useState(0 as number);

  const loadUsers = (pageApi: number, limitApi: number) => fetchAllUsers(
    pageApi,
    limitApi,
    (response: IListResponse<IUser>) => {
      console.log(response.data);
      setUsers(response.data);
      setCountUsers(response.total);
    },
    () => { throw new Error('Ошибка загрузки данных из сервера'); }
  );

  useEffect(() => {
    loadUsers(page, limit);
    setCountPages(countUsers / limit);
  }, [countUsers]);

  const selectPage = (currentPage: number): void => {
    setUsers([]); // Нужно для запуска прелоадера
    setPage(currentPage);
    loadUsers(currentPage, limit);
  };

  const selectLimit = (currentLimit: number, currentCountPages: number): void => {
    setUsers([]); // Нужно для запуска прелоадера
    loadUsers(0, currentLimit);
    setLimit(currentLimit);
    setCountPages(currentCountPages);
  };

  return (
    <ThemeDarkContextProvider>
      <div className="App">
        <Wrapper>
          <Main headerTitle="Пользователи">
            {
              users.length !== 0
                ? (
                  <div className="row">
                    {users.map((item: IUser) => (
                      <div className="col-6" key={item.id}>
                        <Tooltip textInfo={item.id}>
                          <Card
                            imgUrl={item.picture}
                            cardUserId={item.id}
                            cardUserTitle={item.title}
                            cardUserFirstName={item.firstName}
                            cardUserLastName={item.lastName}
                          />
                        </Tooltip>
                      </div>
                    ))}
                  </div>
                )
                : <Spinner />
            }
            <div className="row row_space-between">
              {
                countPages !== 0 && (
                  <Pagenator selectPage={selectPage} countPages={countPages} />
                )
              }
              <Select
                countUsers={countUsers}
                selectLimit={selectLimit}
                limit={limit}
                selectorValues={[5, 10, 20, 30, 40, 50]}
              />
              <ThemeCheckbox />
            </div>
          </Main>
        </Wrapper>
      </div>
    </ThemeDarkContextProvider>
  );
};

export default App;
