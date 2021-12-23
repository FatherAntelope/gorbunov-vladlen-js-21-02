import React from 'react';
import { mount } from 'enzyme';
import Footer from '../../components/footer/Footer';

describe('Footer component testing:', () => {
  test('Render with children:', () => {
    const wrap = mount(
      <Footer>
        <Footer.Body>Тест1</Footer.Body>
        <Footer.Copyright>Тест2</Footer.Copyright>
      </Footer>
    );
    expect(wrap.find('footer.footer')).toHaveLength(1);
    expect(wrap.find('footer.footer .footer__body')).toHaveLength(1);
    expect(wrap.find('footer.footer .footer__copyright')).toHaveLength(1);
    expect(wrap.find('footer.footer .footer__body').text()).toBe('Тест1');
    expect(wrap.find('footer.footer .footer__copyright').text()).toBe('Тест2');
  });

  test('Render with props:', () => {
    const wrap = mount(<Footer isDarkTheme><h1>Тест</h1></Footer>);
    expect(wrap.find('footer.footer').hasClass('footer_theme_dark')).toBeTruthy();
  });

  test('Render with snapshot:', () => {
    const wrap = mount(
      <Footer>
        <Footer.Body>Тест1</Footer.Body>
        <Footer.Copyright>Тест2</Footer.Copyright>
      </Footer>
    );
    expect(wrap).toMatchSnapshot();
  });
});
