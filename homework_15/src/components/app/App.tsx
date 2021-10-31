import './App.css';
import React from 'react';
import Wrapper from '../wrapper/Wrapper';
import Main from '../main/Main';
import Card from '../card/Card';
import Pagenator from '../pagenator/Pagenator';
import ThemeCheckbox from '../theme-checkbox/ThemeCheckbox';
import Tooltip from '../tooltip/Tooltip';
import { fetchDumMyApi, IListResponse, IUser } from '../../utils/fetchDumMyApi';
import Spinner from '../spinner/Spinner';
import {
  IThemeState,
  ThemeCheckboxContextConsumer,
  ThemeCheckboxContextProvider
} from '../../contexts/theme-checkbox/ThemeCheckboxContext';
import Select from '../select/Select';

// const COUNT_ITEMS: number = 99;

interface IState {
  users: Array<IUser>;
  countUsers: number;
  limit: number;
  page: number;
  countPages: number;
}

const initialState = {
  users: [],
  countUsers: 0,
  limit: 5,
  page: 0,
  countPages: 0
};

class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = initialState;
    this.loadUsers = this.loadUsers.bind(this);
    this.selectPage = this.selectPage.bind(this);
    this.selectLimit = this.selectLimit.bind(this);
  }

  componentDidMount(): void {
    (async () => {
      await this.loadUsers(this.state.page, this.state.limit);
      this.setState({ countPages: this.state.countUsers / this.state.limit });
    })();
  }

  selectPage(currentPage: number): void {
    this.setState({ users: [], page: currentPage });
    this.loadUsers(currentPage, this.state.limit);
  }

  selectLimit(currentLimit: number, countPages: number): void {
    this.loadUsers(0, currentLimit);
    this.setState({ users: [], limit: currentLimit, countPages });
  }

  loadUsers(page: number, limit: number) {
    return fetchDumMyApi(
      (response: IListResponse<IUser>) => this.setState({ users: response.data, countUsers: response.total }),
      () => { throw new Error('Ошибка загрузки данных из сервера'); },
      page,
      limit
    );
  }

  render() {
    return (
      <ThemeCheckboxContextProvider>
        <ThemeCheckboxContextConsumer>
          {
            (context: Partial<IThemeState>) => (
              <div className="App">
                <Wrapper themeDark={context.themeDark}>
                  <Main themeDark={context.themeDark} headerTitle="Пользователи">
                    {
                      this.state.users.length !== 0
                        ? (
                          <div className="row">
                            {this.state.users.map((item: IUser) => (
                              <div className="col-6" key={item.id}>
                                <Tooltip themeDark={context.themeDark} textInfo={item.id}>
                                  <Card
                                    themeDark={context.themeDark}
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
                        : <Spinner themeDark={context.themeDark} />
                    }
                    <div className="row row_space-between">
                      {
                        this.state.countPages !== 0 && (
                          <>
                            <Pagenator
                              selectPage={this.selectPage}
                              countPages={this.state.countPages}
                              themeDark={context.themeDark}
                            />
                          </>
                        )
                      }
                      <Select
                        countUsers={this.state.countUsers}
                        selectLimit={this.selectLimit}
                        limit={this.state.limit}
                        selectorValues={[5, 10, 20, 30, 40, 50]}
                      />
                      <ThemeCheckbox checkedCheck={context.themeDark} toggleTheme={context.toggleTheme} />
                    </div>
                  </Main>
                </Wrapper>
              </div>
            )
          }
        </ThemeCheckboxContextConsumer>
      </ThemeCheckboxContextProvider>
    );
  }
}

export default App;
