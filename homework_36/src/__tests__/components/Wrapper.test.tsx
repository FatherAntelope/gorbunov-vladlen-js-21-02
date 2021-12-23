import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import Wrapper from '../../components/wrapper/Wrapper';

const mockStore = configureStore([thunk]);

describe('Wrapper component testing:', () => {
  test('Render with store:', () => {
    const store = mockStore({ burgerHeader: { isActive: true } });
    const wrap = mount(<Provider store={store}><Wrapper /></Provider>);
    expect(wrap.find('div.wrapper')).toHaveLength(1);
    expect(wrap.find('div.wrapper').hasClass('wrapper_scroll_hidden')).toBeTruthy();
  });

  test('Render with children prop:', () => {
    const store = mockStore({ burgerHeader: { isActive: false } });
    const wrap = mount(<Provider store={store}><Wrapper><h1>Тест</h1></Wrapper></Provider>);
    expect(wrap.find('div.wrapper')).toHaveLength(1);
    expect(wrap.find('div.wrapper h1')).toHaveLength(1);
    expect(wrap.find('div.wrapper h1').text()).toBe('Тест');
    expect(wrap.find('div.wrapper').hasClass('wrapper_scroll_hidden')).toBeFalsy();
  });

  test('Render with snapshot:', () => {
    const store = mockStore({ burgerHeader: { isActive: true } });
    const wrap = mount(<Provider store={store}><Wrapper /></Provider>);
    expect(wrap).toMatchSnapshot();
  });
});
