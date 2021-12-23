import React from 'react';
import { mount } from 'enzyme';
import Container from '../../components/container/Container';

describe('Container component testing:', () => {
  test('Render with children:', () => {
    const wrap = mount(<Container><h1>Тест</h1></Container>);
    expect(wrap.find('div.container')).toHaveLength(1);
    expect(wrap.find('div.container h1')).toHaveLength(1);
    expect(wrap.find('div.container h1').text()).toBe('Тест');
  });

  test('Render with snapshot:', () => {
    const wrap = mount(<Container><h1>Тест</h1></Container>);
    expect(wrap).toMatchSnapshot();
  });
});
