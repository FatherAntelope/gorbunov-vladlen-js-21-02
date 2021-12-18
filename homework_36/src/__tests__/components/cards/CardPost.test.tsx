import React from 'react';
import { mount } from 'enzyme';
import CardPost from '../../../components/cards/card-post/CardPost';

describe('CardPost.Preview component testing:', () => {
  test('Render with image and check props:', () => {
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
    const wrap = mount(
      <CardPost.Preview
        text="Текст"
        userAvatarURL="URL"
        userFullName="Полное Имя"
        dateOfPublication="19.12.2021"
      >
        <CardPost.Image imageURL="URL" />
      </CardPost.Preview>
    );
    expect(wrap.find('div.card-post')).toHaveLength(1);
    expect(wrap.find('div.card-post p.card-post__text').text()).toBe('Текст');
    expect(wrap.find('div.card-post div.card-post__title').text()).toBe('Полное Имя');
    expect(wrap.find('div.card-post p.card-post__subtitle').text()).toBe('19.12.2021');
  });

  test('Render with snapshot:', () => {
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
    const wrap = mount(
      <CardPost.Preview
        isDarkTheme
        text="Текст"
        userAvatarURL="URL"
        userFullName="Полное Имя"
        dateOfPublication="19.12.2021"
      >
        <CardPost.Image imageURL="URL" />
      </CardPost.Preview>
    );
    expect(wrap).toMatchSnapshot();
  });
});

describe('CardPost.Mini component testing:', () => {
  test('Render and check props:', () => {
    const wrap = mount(<CardPost.Mini text="Текст"><h1>Тест</h1></CardPost.Mini>);
    expect(wrap.find('div.card-post')).toHaveLength(1);
    expect(wrap.find('div.card-post p.card-post__text').text()).toBe('Текст');
    expect(wrap.find('div.card-post h1').text()).toBe('Тест');
  });

  test('Render with snapshot:', () => {
    const wrap = mount(<CardPost.Mini isDarkTheme text="Текст"><h1>Тест</h1></CardPost.Mini>);
    expect(wrap).toMatchSnapshot();
  });
});

describe('CardPost.Big component testing:', () => {
  test('Render with image and check props:', () => {
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
    const wrap = mount(
      <CardPost.Big text="Текст">
        <CardPost.HeaderBig
          userAvatarURL="URL"
          userFullName="Полное Имя"
          dateOfPublication="19.12.2021"
        />
        <CardPost.ImageBig imageURL="URL" />
      </CardPost.Big>
    );
    expect(wrap.find('div.card-post.card-post_big')).toHaveLength(1);
    expect(wrap.find('div.card-post.card-post_big p.card-post__text_big').text()).toBe('Текст');
    expect(wrap.find('div.card-post__title').text()).toBe('Полное Имя');
    expect(wrap.find('p.card-post__subtitle').text()).toBe('19.12.2021');
  });

  test('Render with snapshot:', () => {
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
    const wrap = mount(
      <CardPost.Big text="Текст" isDarkTheme>
        <CardPost.HeaderBig
          isDarkTheme
          userAvatarURL="URL"
          userFullName="Полное Имя"
          dateOfPublication="19.12.2021"
        />
        <CardPost.ImageBig imageURL="URL" />
      </CardPost.Big>
    );
    expect(wrap).toMatchSnapshot();
  });
});
