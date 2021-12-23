import React from 'react';
import { mount } from 'enzyme';
import CardComment from '../../../components/cards/card-comment/CardComment';

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

describe('CardComment component testing:', () => {
  test('Render and check props:', () => {
    createMatchMedia();
    const wrap = mount(
      <CardComment dateOfPublication="18.18.2018" userAvatarURL="url" text="Текст" userFullName="Полное Имя" />
    );
    expect(wrap.find('div.card-comment')).toHaveLength(1);
    expect(wrap.find('p.card-comment__text').text()).toBe('Текст');
    expect(wrap.find('div.card-comment__date').text()).toBe('18.18.2018');
    expect(wrap.find('div.card-comment__name').text()).toBe('Полное Имя');
  });

  test('Render with theme dark:', () => {
    createMatchMedia();
    const wrap = mount(
      <CardComment isDarkTheme dateOfPublication="" userAvatarURL="" text="" userFullName="" />
    );
    expect(wrap.find('div.card-comment').hasClass('card-comment_theme_dark')).toBeTruthy();
    expect(wrap.find('div.card-comment__name').hasClass('card-comment__name_theme_dark')).toBeTruthy();
    expect(wrap.find('div.card-comment__date').hasClass('card-comment__name_theme_date')).toBeTruthy();
  });

  test('Render with snapshot:', () => {
    createMatchMedia();
    const wrap = mount(
      <CardComment
        isDarkTheme
        dateOfPublication="18.18.2018"
        userAvatarURL="url"
        text="Текст"
        userFullName="Полное Имя"
      />
    );
    expect(wrap).toMatchSnapshot();
  });
});
