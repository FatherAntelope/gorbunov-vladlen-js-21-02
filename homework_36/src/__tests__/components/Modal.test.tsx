import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Modal from '../../components/modal/Modal';

const mockStore = configureStore([thunk]);

describe('Modal component testing:', () => {
  test('Render:', () => {
    const store = mockStore({});
    const wrap = mount(<Provider store={store}><Modal isActive={false} /></Provider>);
    expect(wrap.find('div.modal')).toHaveLength(1);
  });

  test('Render with props:', () => {
    const store = mockStore({});
    const wrap = mount(
      <Provider store={store}><Modal size="mini" isActive isDarkTheme><h1>Тест</h1></Modal></Provider>
    );
    expect(wrap.find('div.modal__dialog').hasClass('modal__dialog_mini')).toBeTruthy();
    expect(wrap.find('div.modal').hasClass('modal_active')).toBeTruthy();
    expect(wrap.find('div.modal__close').hasClass('modal__close_theme_dark')).toBeTruthy();
    expect(wrap.find('span.modal__close-icon').hasClass('modal__close-icon_theme_dark')).toBeTruthy();
    expect(wrap.find('div.modal__content').hasClass('modal__content_active')).toBeTruthy();
    expect(wrap.find('div.modal__content').hasClass('modal__content_theme_dark')).toBeTruthy();
  });

  test('Render with simulate click and snapshot:', () => {
    const store = mockStore({});
    const wrap = mount(
      <Provider store={store}><Modal size="mini" isActive isDarkTheme><h1>Тест</h1></Modal></Provider>
    );
    wrap.find('div.modal__close').simulate('click');
    wrap.find('div.modal__content').simulate('click', { stopPropagation: jest.fn() });
    expect(wrap).toMatchSnapshot();
  });
});
