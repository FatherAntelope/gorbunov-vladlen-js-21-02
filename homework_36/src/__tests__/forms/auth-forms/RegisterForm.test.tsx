import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { HashRouter } from 'react-router-dom';
import RegisterForm from '../../../components/forms/auth-forms/RegisterForm';
import { ThemeCheckboxContext } from '../../../contexts/theme-checkbox/ThemeCheckboxContext';

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

describe('RegisterForm component form testing:', () => {
  test('Render and simulate events', () => {
    createMatchMedia();
    const store = mockStore({
      sendUserForm: {
        sendUser: {
          id: '234325ih8n9l79uj',
          picture: 'url',
          firstName: 'Ivan Ivanov',
        },
        isLoading: false
      }
    });
    store.dispatch = jest.fn();

    const wrap = mount(
      <Provider store={store}>
        <HashRouter>
          <RegisterForm />
        </HashRouter>
      </Provider>
    );
    expect(wrap.find('div.user-auth')).toHaveLength(1);
    wrap.find('#formRegisterUser').at(0).simulate('error');
  });

  test('Render with snapshot', () => {
    createMatchMedia();
    const store = mockStore({
      sendUserForm: {
        sendUser: {
          id: '234325ih8n9l79uj',
          picture: 'url',
          firstName: 'Ivan Ivanov',
        },
        isLoading: false
      }
    });
    store.dispatch = jest.fn();

    const wrap = mount(
      <Provider store={store}>
        <HashRouter>
          <ThemeCheckboxContext.Provider value={{ isDarkTheme: true }}>
            <RegisterForm />
          </ThemeCheckboxContext.Provider>
        </HashRouter>
      </Provider>
    );
    expect(wrap).toMatchSnapshot();
  });
});
