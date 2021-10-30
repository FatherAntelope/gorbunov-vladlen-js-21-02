import './App.css';
import React from 'react';
import Wrapper from '../wrapper/Wrapper';
import Main from '../main/Main';
import Card from '../card/Card';
import Pagenator from '../pagenator/Pagenator';
import ThemeCheckbox from '../theme-checkbox/ThemeCheckbox';
import Tooltip from '../tooltip/Tooltip';
import { fetchDumMyApiUsers, IUser } from '../../utils/fetchDumMyApi';
import Spinner from '../spinner/Spinner';
import {
  IThemeState,
  ThemeCheckboxContextConsumer,
  ThemeCheckboxContextProvider
} from '../../contexts/theme-checkbox/ThemeCheckboxContext';

interface IState {
  users: Array<IUser>
}

const initialState = {
  users: []
};

class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = initialState;
    this.loadUsers = this.loadUsers.bind(this);
  }

  componentDidMount(): void {
    this.loadUsers(0, 10);
  }

  loadUsers(page: number, limit: number) {
    fetchDumMyApiUsers(
      (response: Array<IUser>) => this.setState({ users: response }),
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
                    <div className="row">
                      {
                        this.state.users.length !== 0
                          ? this.state.users.map((item: IUser) => (
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
                          ))
                          : <Spinner themeDark={context.themeDark} />
                      }
                    </div>
                    <div className="row row_space-between">
                      <Pagenator themeDark={context.themeDark} />
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
