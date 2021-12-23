import defaultUserAvatar from '../images/default-user-avatar.jpg';
import { ICreateUser } from '../types/api/localServer';

const getUserFullName = (title: string, fullName: string): string => (
  `${title ? `${title}.` : ''} ${fullName}`
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

const getObjectSendDataUser = (formData: ICreateUser): ICreateUser => ({
  ...formData,
  title: formData.gender === 'male' ? 'mr' : 'ms',
  registerDate: new Date(),
});

export {
  getUserFullName, checkPictureAndGet, getUserGenderRu, getObjectSendDataUser
};
