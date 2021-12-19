import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import CardUserEdit from '../../../components/cards/card-user-edit/CardUserEdit';

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

describe('CardUserEdit component testing:', () => {
  test('Render', () => {
    createMatchMedia();

    const store = mockStore({
      sendUserForm: {
        sendUser: {},
        isLoading: false
      },
      imageEditForm: {
        editImageURL: '',
        isLoading: false
      }
    });
    store.dispatch = jest.fn();

    const wrap = mount(
      <Provider store={store}>
        <CardUserEdit
          avatar="URL"
          gender="male"
          firstName="Ivan"
          lastName="Ivanov"
          dateOfBirth="1972-08-07T22:16:47.420Z"
          phone="8800553535"
        />
      </Provider>
    );
    expect(wrap.find('div.user-edit-form')).toHaveLength(1);
    expect(wrap.find('div.user-edit-form__image img').prop('src')).toBe('URL');
  });

  test('Render and simulate actions', () => {
    createMatchMedia();

    const store = mockStore({
      sendUserForm: {
        sendUser: {
          id: '18721tghnm2gvbdyuicyh2nm8',
          fullName: 'Ivan Ivanov'
        },
        isLoading: false
      },
      imageEditForm: {
        editImageURL: 'URL',
        isLoading: false
      }
    });
    store.dispatch = jest.fn();

    const wrap = mount(
      <Provider store={store}>
        <CardUserEdit
          avatar="URL"
          gender="male"
          firstName="Ivan"
          lastName="Ivanov"
          dateOfBirth="1972-08-07T22:16:47.420Z"
          phone="8800553535"
        />
      </Provider>
    );
    expect(wrap.find('div.user-edit-form')).toHaveLength(1);
    wrap.find('#buttonDeletePhoto').at(0).simulate('click');
    wrap.find('#formEditDataUser').at(0).simulate('error');
  });

  test('Render snapshot', () => {
    createMatchMedia();

    const store = mockStore({
      sendUserForm: {
        sendUser: {
          id: '18721tghnm2gvbdyuicyh2nm8',
          fullName: 'Ivan Ivanov'
        },
        isLoading: false
      },
      imageEditForm: {
        editImageURL: 'URL',
        isLoading: false
      }
    });
    store.dispatch = jest.fn();

    const wrap = mount(
      <Provider store={store}>
        <CardUserEdit
          avatar="URL"
          gender="male"
          firstName="Ivan"
          lastName="Ivanov"
          dateOfBirth="1972-08-07T22:16:47.420Z"
          phone="8800553535"
        />
      </Provider>
    );
    expect(wrap).toMatchSnapshot();
  });
});
