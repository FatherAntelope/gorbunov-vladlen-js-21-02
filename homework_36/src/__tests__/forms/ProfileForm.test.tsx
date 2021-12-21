import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { HashRouter } from 'react-router-dom';
import ProfileForm from '../../components/forms/profile-form/ProfileForm';

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

const states = {
  postForm: {
    post: {
      id: '32rfe232gh32r2',
      picture: 'url',
      text: 'lorem ipsum dolor',
      publishDate: '1972-08-07T22:16:47.420Z',
      owner: {
        id: '32rfe232gh',
        picture: 'url',
        title: 'male',
        fullName: 'Ferdinand Ellington'
      }
    },
    isLoading: false
  },
  postCommentsForm: {
    postComments: {
      data: [{
        id: '7268yj93i2jn',
        message: 'lorem ipsum dolor',
        publishDate: '1972-08-07T22:16:47.420Z',
        owner: {
          id: '32rfe232gh',
          picture: 'url',
          title: 'male',
          fullName: 'Ferdinand Ellington'
        }
      }],
      limit: 5,
      page: 0,
      total: 1
    },
    isLoading: false
  },
  modalsForm: {},
  userFullForm: {
    user: {
      id: '24r43wef43t',
      picture: 'url',
      title: 'mrs',
      fullName: 'Oleg Ivanov',
      gender: 'male',
      dateOfBirth: '1972-08-07T22:16:47.420Z',
      registerDate: '1972-08-07T22:16:47.420Z',
      email: 'mail@example.ru',
      phone: '88005553535'
    },
    isLoading: false
  },
  userPostsForm: {
    userPosts: {
      data: [{
        id: '32rfe232gh',
        text: 'lorem ipsum dolor',
        img: 'url'
      }]
    },
    isLoading: false
  },
  sendUserForm: {
    sendUser: {
      id: '32rfe232gh',
      picture: 'url',
      title: 'male',
      fullName: 'Ferdinand Ellington'
    },
    isLoading: false
  },
  imageEditForm: {
    editImageURL: 'URL',
    isLoading: false
  }
};

describe('ProfileForm component form testing:', () => {
  test('Render', () => {
    createMatchMedia();
    const store = mockStore(states);
    store.dispatch = jest.fn();

    const wrap = mount(
      <Provider store={store}>
        <HashRouter>
          <ProfileForm />
        </HashRouter>
      </Provider>
    );
    expect(wrap.find('UserFullForm')).toHaveLength(1);
    expect(wrap.find('UserPostsForm')).toHaveLength(1);
  });

  test('Render with snapshot', () => {
    createMatchMedia();
    const store = mockStore(states);
    store.dispatch = jest.fn();

    const wrap = mount(
      <Provider store={store}>
        <HashRouter>
          <ProfileForm />
        </HashRouter>
      </Provider>
    );
    expect(wrap).toMatchSnapshot();
  });
});
