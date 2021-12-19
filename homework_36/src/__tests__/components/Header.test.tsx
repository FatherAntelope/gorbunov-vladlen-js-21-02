import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { HashRouter, Link } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Header from '../../components/header/Header';
import * as actions from '../../actions/burgerHeaderAction';

jest.mock('../../actions/burgerHeaderAction');
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const createMatchMedia = () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }))
  });
};

const mockStore = configureStore([thunk]);

describe('Header component testing:', () => {
  test('Render:', () => {
    const store = mockStore({ burgerHeader: { isActive: false } });
    store.dispatch = jest.fn();
    const wrap = mount(
      <Provider store={store}>
        <HashRouter>
          <Header>
            <Header.Body>
              <Header.Burger />
              <Header.Logo text="Пример" src="src" />
              <Header.Auth />
              <Link to="/" />
            </Header.Body>
          </Header>
        </HashRouter>
      </Provider>
    );
    expect(wrap.find('header.header')).toHaveLength(1);
    expect(wrap.find('div.header__body')).toHaveLength(1);
    expect(wrap.find('div.header__burger')).toHaveLength(1);
    expect(wrap.find('div.header__logo')).toHaveLength(1);
    expect(wrap.find('div.header__auth')).toHaveLength(1);

    wrap.find('div.header__burger').simulate('click');
  });

  test('Render with props and simulate:', () => {
    createMatchMedia();
    const store = mockStore({ burgerHeader: { isActive: true } });
    store.dispatch = jest.fn();
    const wrap = mount(
      <Provider store={store}>
        <HashRouter>
          <Header isDarkTheme>
            <Header.Body>
              <Header.Burger isDarkTheme />
              <Header.Logo text="Пример" src="src" />
              <Header.Auth isDarkTheme authData={{ userID: 'src', userAvatarSrc: 'src', userFirstName: 'src' }} />
              <Link to="/login" />
              <Link to="/register" />
            </Header.Body>
          </Header>
        </HashRouter>
      </Provider>
    );
    expect(wrap.find('header.header').hasClass('header_theme_dark')).toBeTruthy();
    expect(wrap.find('div.header__burger').hasClass('header__burger_theme_dark')).toBeTruthy();
    expect(wrap.find('div.header__burger').hasClass('header__burger_active')).toBeTruthy();

    wrap.find('p.header__auth-text').at(0).simulate('click');
    wrap.find('p.header__auth-text.header__auth-text_active').simulate('click');
    wrap.find('div.header__burger').simulate('click');
    expect(actions.burgerHeaderSetNotActiveAC).toBeCalled();
  });

  test('Render with snapshot:', () => {
    createMatchMedia();
    const store = mockStore({ burgerHeader: { isActive: true } });
    const wrap = mount(
      <Provider store={store}>
        <HashRouter>
          <Header isDarkTheme>
            <Header.Body>
              <Header.Burger isDarkTheme />
              <Header.Logo text="Пример" src="src" />
              <Header.Auth isDarkTheme authData={{ userID: 'src', userAvatarSrc: 'src', userFirstName: 'src' }} />
              <Link to="/login" />
              <Link to="/register" />
            </Header.Body>
          </Header>
        </HashRouter>
      </Provider>
    );
    expect(wrap).toMatchSnapshot();
  });
});
