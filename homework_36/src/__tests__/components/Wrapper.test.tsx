import React from 'react';
import { shallow } from 'enzyme';
import Wrapper from '../../components/wrapper/Wrapper';

describe('Wrapper component testing:', () => {
  test('Wrapper render should:', () => {
    const wrap = shallow(<Wrapper />);
    expect(wrap.find('div.wrapper')).toHaveLength(1);
  });
});
