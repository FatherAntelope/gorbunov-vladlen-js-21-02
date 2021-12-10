import React from 'react';
import './App.scss';
import {
  Redirect, Route, Switch
} from 'react-router-dom';
import Wrapper from '../wrapper/Wrapper';
import Main from '../main/Main';
import Container from '../container/Container';
import Segment from '../segment/Segment';
import HeaderForm from '../forms/header-form/HeaderForm';
import FooterForm from '../forms/footer-form/FooterForm';
import LoginForm from '../forms/auth-forms/LoginForm';
import RegisterForm from '../forms/auth-forms/RegisterForm';
import UsersForm from '../forms/users-form/UsersForm';
import PostsForm from '../forms/posts-form/PostsForm';
import ProfileForm from '../forms/profile-form/ProfileForm';
import { IThemeState, ThemeCheckboxContext } from '../../contexts/theme-checkbox/ThemeCheckboxContext';
import { clearImageEditFormAC } from '../../actions/imageEditFormAction';
import { clearLoginUserFormAC } from '../../actions/loginUserFormAction';
import { clearSendDataUserFormAction } from '../../actions/sendUserFormAction';

class App extends React.Component {
  /* Действия при размонтировании компонента для примера */
  componentWillUnmount() {
    clearImageEditFormAC();
    clearLoginUserFormAC();
    clearSendDataUserFormAction();
  }

  render() {
    return (
      <ThemeCheckboxContext.Consumer>
        {
          (context: Partial<IThemeState>) => (
            <div className="App">
              <Wrapper>
                <HeaderForm />
                <Main isDarkTheme={context.isDarkTheme}>
                  <Container>
                    <Switch>
                      <Route exact path="/login">
                        <Segment isDarkTheme={context.isDarkTheme}>
                          <LoginForm />
                        </Segment>
                      </Route>
                      <Route exact path="/register">
                        <Segment isDarkTheme={context.isDarkTheme}>
                          <RegisterForm />
                        </Segment>
                      </Route>
                      <Route exact path="/users">
                        <UsersForm />
                      </Route>
                      <Route exact path="/posts">
                        <PostsForm />
                      </Route>
                      <Route exact path="/user/:id">
                        <ProfileForm />
                      </Route>
                      <Redirect from="/" to="/login" />
                    </Switch>
                  </Container>
                </Main>
                <FooterForm />
              </Wrapper>
            </div>
          )
        }
      </ThemeCheckboxContext.Consumer>
    );
  }
}

export default App;
