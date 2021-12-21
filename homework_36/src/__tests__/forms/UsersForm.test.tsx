import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { HashRouter } from 'react-router-dom';
import UsersForm from '../../components/forms/users-form/UsersForm';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const mockStore = configureStore([thunk]);

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

describe('UsersForm component form testing:', () => {
  test('Render', () => {
    createMatchMedia();
    const store = mockStore({
      usersForm: {
        users: {
          data: [{
            id: '32rfe232gh',
            picture: 'url',
            title: 'male',
            fullName: 'Ferdinand Ellington'
          }],
          limit: 5,
          page: 0,
          total: 1
        },
        isLoading: false
      }
    });
    store.dispatch = jest.fn();

    const wrap = mount(
      <Provider store={store}>
        <HashRouter>
          <UsersForm />
        </HashRouter>
      </Provider>
    );
    expect(wrap.find('div.row')).toHaveLength(2);
  });

  test('Render with error', () => {
    createMatchMedia();
    const store = mockStore({
      usersForm: {
        users: {
          data: [],
          limit: 5,
          page: 0,
          total: 1
        },
        isLoading: false,
        error: 'error message'
      }
    });
    store.dispatch = jest.fn();

    const wrap = mount(
      <Provider store={store}>
        <HashRouter>
          <UsersForm />
        </HashRouter>
      </Provider>
    );
    expect(wrap.find('Alert')).toHaveLength(1);
  });

  test('Render with loading', () => {
    createMatchMedia();
    const store = mockStore({
      usersForm: {
        users: {
          data: [],
          limit: 5,
          page: 0,
          total: 1
        },
        isLoading: true,
      }
    });
    store.dispatch = jest.fn();

    const wrap = mount(
      <Provider store={store}>
        <HashRouter>
          <UsersForm />
        </HashRouter>
      </Provider>
    );
    expect(wrap.find('Preloader')).toHaveLength(1);
  });

  test('Render with snapshot', () => {
    createMatchMedia();
    const store = mockStore({
      usersForm: {
        users: {
          data: [{
            id: '32rfe232gh',
            picture: 'url',
            title: 'male',
            fullName: 'Ferdinand Ellington'
          }],
          limit: 5,
          page: 0,
          total: 1
        },
        isLoading: false
      }
    });
    store.dispatch = jest.fn();

    const wrap = mount(
      <Provider store={store}>
        <HashRouter>
          <UsersForm />
        </HashRouter>
      </Provider>
    );
    expect(wrap).toMatchSnapshot();
  });
});
