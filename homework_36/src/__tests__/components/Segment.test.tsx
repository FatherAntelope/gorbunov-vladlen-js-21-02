import React from 'react';
import { shallow, mount } from 'enzyme';
import Segment from '../../components/segment/Segment';

describe('Segment component testing:', () => {
  test('Render:', () => {
    const wrap = shallow(<Segment />);
    expect(wrap.find('div.segment')).toHaveLength(1);
  });

  test('Render with children:', () => {
    const wrap = mount(<Segment><h1>Тест</h1></Segment>);
    expect(wrap.find('div.segment h1')).toHaveLength(1);
    expect(wrap.find('div.segment h1').text()).toBe('Тест');
  });

  test('Render with dark theme:', () => {
    const wrap = mount(<Segment isDarkTheme />);
    expect(wrap.find('div.segment').hasClass('segment_theme_dark')).toBeTruthy();
  });

  test('Render with snapshot:', () => {
    const wrap = mount(<Segment isDarkTheme><h1>Тест</h1></Segment>);
    expect(wrap).toMatchSnapshot();
  });
});
