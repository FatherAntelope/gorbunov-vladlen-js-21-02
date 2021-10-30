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

// const COUNT_ITEMS: number = 99;

interface IState {
  users: Array<IUser>,
  countUsers: number,
  limit: number,
  page: number
}

const initialState = {
  users: [],
  countUsers: 0,
  limit: 10,
  page: 0
};

class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = initialState;
    this.loadUsers = this.loadUsers.bind(this);
    this.selectPage = this.selectPage.bind(this);
  }

  componentDidMount(): void {
    this.loadUsers(this.state.page, this.state.limit);
  }

  selectPage(currentPage: number): void {
    this.setState({ users: [] });
    this.loadUsers(currentPage, this.state.limit);
    this.setState({ page: currentPage });
  }

  loadUsers(page: number, limit: number) {
    fetchDumMyApi(
      (response: IListResponse<IUser>) => this.setState({ users: response.data, countUsers: response.total }),
      () => console.log('Ошибка выгрузки пользователей'),
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
                        this.state.countUsers !== 0 && (
                          <Pagenator
                            selectPage={this.selectPage}
                            countPages={this.state.countUsers / this.state.limit}
                            themeDark={context.themeDark}
                          />
                        )
                      }
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
