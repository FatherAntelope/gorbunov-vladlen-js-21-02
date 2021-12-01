import defaultUserAvatar from '../images/default-user-avatar.jpg';
import { ICreateUser } from '../types/api/dumMyApi';

const getUserFullName = (title: string, firstName: string, lastName: string): string => (
  `${title ? `${title}.` : ''} ${firstName} ${lastName}`
);

const checkPictureAndGet = (picture: string): string => (
  (picture && picture !== 'undefined') ? picture : defaultUserAvatar
);

const getUserGenderRu = (gender: string): string => {
  switch (gender) {
    case 'male':
      return 'Мужской';
    case 'female':
      return 'Женский';
    case 'other':
      return 'Другой';
    default:
      return '';
  }
};

const getDateRU = (dateTime: string): string => {
  const date = new Date(dateTime);
  const months: string[] = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ];

  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

const getDateTimePublication = (dateTime: string): string => {
  const date = new Date(dateTime);
  const months: string[] = [
    'янв.', 'фев.', 'марта', 'апр.', 'мая', 'июня', 'июля', 'авг.', 'сен.', 'окт.', 'ноя.', 'дек.'
  ];
  return `${date.getDate()} ${months[date.getMonth()]}${
    new Date().getFullYear() !== date.getFullYear() ? ` ${date.getFullYear()} г.` : ''
  } в ${date.getHours()}:${date.getMinutes() <= 9 ? `0${date.getMinutes()}` : date.getMinutes()}`;
};

const getJSONStringifyForRegisterUser = (formData: ICreateUser): string => JSON.stringify({
  firstName: formData.firstName,
  lastName: formData.lastName,
  email: formData.email,
  phone: formData.phone,
  title: formData.gender === 'male' ? 'mr' : 'ms',
  gender: formData.gender,
  dateOfBirth: formData.dateOfBirth,
  registerDate: new Date(),
});

const getJSONStringifyForEditDataUser = (formData: ICreateUser): string => JSON.stringify({
  firstName: formData.firstName,
  lastName: formData.lastName,
  gender: formData.gender,
  dateOfBirth: formData.dateOfBirth,
  phone: formData.phone,
  title: formData.gender === 'male' ? 'mr' : 'ms',
});

export {
  getUserFullName, checkPictureAndGet, getDateTimePublication, getUserGenderRu, getDateRU,
  getJSONStringifyForRegisterUser, getJSONStringifyForEditDataUser
};
