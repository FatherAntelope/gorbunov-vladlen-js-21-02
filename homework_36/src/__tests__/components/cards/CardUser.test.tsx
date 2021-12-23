import React from 'react';
import { mount } from 'enzyme';
import CardUser from '../../../components/cards/card-user/CardUser';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('CardUser.Preview component testing:', () => {
  test('Render and check props', () => {
    const wrap = mount(
      <CardUser.Preview
        imageURL="URL"
        fullName="Полное Имя"
      />
    );
    expect(wrap.find('div.card-user')).toHaveLength(1);
    expect(wrap.find('div.card-user__text').text()).toBe('Полное Имя');
    expect(wrap.find('div.card-user__image img').prop('src')).toBe('URL');
  });

  test('Render with snapshot', () => {
    const wrap = mount(
      <CardUser.Preview
        isDarkTheme
        imageURL="URL"
        fullName="Полное Имя"
      />
    );
    expect(wrap).toMatchSnapshot();
  });
});

describe('CardUser.Full component testing:', () => {
  test('Render and check props', () => {
    const wrap = mount(
      <CardUser.Full
        id="123"
        imageURL="URL"
        fullName="Полное Имя"
        gender="Мужской"
        dateOfRegister="18.12.2021"
        dateOfBirth="18.11.2015"
        email="mail@mail.com"
        phone="898005553535"
      />
    );
    expect(wrap.find('div.card-user-full')).toHaveLength(1);
    expect(wrap.find('h2.card-user-full__title').text()).toBe('Полное Имя');
    expect(wrap.find('div.card-user-full__image img').prop('src')).toBe('URL');
  });

  test('Render with snapshot', () => {
    const wrap = mount(
      <CardUser.Full
        isDarkTheme
        id="123"
        imageURL="URL"
        fullName="Полное Имя"
        gender="Мужской"
        dateOfRegister="18.12.2021"
        dateOfBirth="18.11.2015"
        email="mail@mail.com"
        phone="898005553535"
        edit={<CardUser.Edit />}
      />
    );
    expect(wrap).toMatchSnapshot();
  });
});
