import React from 'react';
import { shallow } from 'enzyme';
import Preloader from '../../components/preloader/Preloader';

describe('Preloader component testing:', () => {
  test('Render:', () => {
    const wrap = shallow(<Preloader />);
    expect(wrap.find('div.preloader')).toHaveLength(1);
  });

  test('Render with snapshot:', () => {
    const wrap = shallow(<Preloader />);
    expect(wrap).toMatchSnapshot();
  });
});
