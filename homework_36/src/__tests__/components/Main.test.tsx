import React from 'react';
import { shallow, mount } from 'enzyme';
import Main from '../../components/main/Main';

describe('Menu component testing:', () => {
  test('Render:', () => {
    const wrap = shallow(<Main />);
    expect(wrap.find('main.main')).toHaveLength(1);
  });

  test('Render with props:', () => {
    const wrap = mount(<Main isDarkTheme><h1>Тест</h1></Main>);
    expect(wrap.find('main.main h1')).toHaveLength(1);
    expect(wrap.find('main.main h1').text()).toBe('Тест');
    expect(wrap.find('main.main').hasClass('main_theme_dark')).toBeTruthy();
  });

  test('Render with snapshot:', () => {
    const wrap = mount(<Main isDarkTheme><h1>Тест</h1></Main>);
    expect(wrap).toMatchSnapshot();
  });
});
