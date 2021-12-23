import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { HashRouter } from 'react-router-dom';
import PostsForm from '../../components/forms/posts-form/PostsForm';

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
  postsForm: {
    posts: {
      data: [{
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
      }],
      limit: 5,
      page: 0,
      total: 1
    },
    isLoading: false
  },
  modalsForm: {},
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
  }
};

describe('PostsForm component form testing:', () => {
  test('Render and simulate', () => {
    createMatchMedia();
    const store = mockStore(states);
    store.dispatch = jest.fn();

    const wrap = mount(
      <Provider store={store}>
        <HashRouter>
          <PostsForm />
        </HashRouter>
      </Provider>
    );
    expect(wrap.find('div.row')).toHaveLength(3);
    wrap.find('#openCardPostModal').simulate('click');
  });

  test('Render with error', () => {
    createMatchMedia();
    const store = mockStore({
      postsForm: {
        posts: {
          data: [],
          limit: 5,
          page: 0,
          total: 1
        },
        isLoading: false,
        error: 'error message'
      },
    });
    store.dispatch = jest.fn();

    const wrap = mount(
      <Provider store={store}>
        <HashRouter>
          <PostsForm />
        </HashRouter>
      </Provider>
    );
    expect(wrap.find('Alert')).toHaveLength(1);
  });

  test('Render with loading', () => {
    createMatchMedia();
    const store = mockStore({
      postsForm: {
        posts: {
          data: [],
          limit: 5,
          page: 0,
          total: 1
        },
        isLoading: true,
      },
    });
    store.dispatch = jest.fn();

    const wrap = mount(
      <Provider store={store}>
        <HashRouter>
          <PostsForm />
        </HashRouter>
      </Provider>
    );
    expect(wrap.find('Preloader')).toHaveLength(1);
  });

  test('Render with snapshot', () => {
    createMatchMedia();
    const store = mockStore(states);
    store.dispatch = jest.fn();

    const wrap = mount(
      <Provider store={store}>
        <HashRouter>
          <PostsForm />
        </HashRouter>
      </Provider>
    );
    expect(wrap).toMatchSnapshot();
  });
});
