import React from 'react';
import { mount } from 'enzyme';
import Tooltip from '../../components/tooltip/Tooltip';

describe('Segment component testing:', () => {
  test('Render and check props:', () => {
    const wrap = mount(<Tooltip textInfo="Подсказка"><h1>Тест</h1></Tooltip>);
    expect(wrap.find('div.tooltip')).toHaveLength(1);
    expect(wrap.find('div.tooltip').text()).toBe('Тест');

    wrap.find('div.tooltip').simulate('mouseOver', { stopPropagation: jest.fn() });
    expect(wrap.find('div.tooltip .tooltip__info').text()).toBe('Подсказка');

    wrap.find('div.tooltip').simulate('mouseOut', { stopPropagation: jest.fn() });
    expect(wrap.contains('div.tooltip .tooltip__info')).toBeFalsy();
  });

  test('Render with dark theme:', () => {
    const wrap = mount(<Tooltip textInfo="Подсказка" isDarkTheme><h1>Тест</h1></Tooltip>);
    wrap.find('div.tooltip').simulate('mouseOver', { stopPropagation: jest.fn() });
    expect(wrap.find('div.tooltip .tooltip__info').hasClass('tooltip__info_theme_dark')).toBeTruthy();
  });

  test('Render with snapshot:', () => {
    const wrap = mount(<Tooltip textInfo="Подсказка" isDarkTheme><h1>Тест</h1></Tooltip>);
    wrap.find('div.tooltip').simulate('mouseOver', { stopPropagation: jest.fn() });
    expect(wrap).toMatchSnapshot();
  });
});
