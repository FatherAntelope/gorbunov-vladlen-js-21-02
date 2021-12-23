import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Menu from '../../components/menu/Menu';
import * as actions from '../../actions/burgerHeaderAction';

jest.mock('../../actions/burgerHeaderAction');

const mockStore = configureStore([thunk]);

describe('Modal component testing:', () => {
  test('Render with items:', () => {
    const store = mockStore({ burgerHeader: { isActive: false } });
    const wrap = mount(
      <Provider store={store}>
        <Menu>
          <Menu.Item label="Меню 1" />
          <Menu.Item label="Меню 2" />
          <Menu.Item label="Меню 3" />
        </Menu>
      </Provider>
    );
    expect(wrap.find('nav.menu')).toHaveLength(1);
    expect(wrap.find('div.menu__item')).toHaveLength(3);
  });

  test('Render with props:', () => {
    const store = mockStore({ burgerHeader: { isActive: false } });
    const wrap = mount(
      <Provider store={store}>
        <Menu isDarkTheme>
          <Menu.Item label="Меню 1" isDarkTheme />
        </Menu>
      </Provider>
    );
    expect(wrap.find('nav.menu').hasClass('menu_theme_dark')).toBeTruthy();
    expect(wrap.find('div.menu__item').hasClass('menu__item_theme_dark')).toBeTruthy();
  });

  test('Render simulate active mobile slide:', () => {
    const store = mockStore({ burgerHeader: { isActive: true } });
    store.dispatch = jest.fn();
    const wrap = mount(
      <Provider store={store}>
        <Menu>
          <Menu.Item label="Меню 1" />
        </Menu>
      </Provider>
    );
    expect(wrap.find('nav.menu').hasClass('menu_mobile-slide_active')).toBeTruthy();
    actions.burgerHeaderSetNotActiveAC(); // !!!
    wrap.find('div.menu__item').simulate('click');
  });

  test('Render with snapshot:', () => {
    const store = mockStore({ burgerHeader: { isActive: true } });
    const wrap = mount(
      <Provider store={store}>
        <Menu isDarkTheme>
          <Menu.Item isDarkTheme label="Меню 1" />
        </Menu>
      </Provider>
    );
    expect(wrap).toMatchSnapshot();
  });
});
