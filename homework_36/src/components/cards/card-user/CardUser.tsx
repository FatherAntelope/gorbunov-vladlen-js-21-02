import React from 'react';
import './CardUser.scss';
import { EditOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

interface IPropsCardPreview {
  imageURL: string;
  fullName: React.ReactNode;
  // eslint-disable-next-line react/require-default-props
  isDarkTheme?: boolean;
}

interface IPropsCardFull {
  id: string;
  imageURL: string;
  fullName: React.ReactNode;
  gender: string;
  dateOfBirth: string;
  dateOfRegister: string;
  email: string;
  phone: string;
  // eslint-disable-next-line react/require-default-props
  edit?: React.ReactNode;
  // eslint-disable-next-line react/require-default-props
  isDarkTheme?:boolean;
}

interface IPropsEdit {
  // eslint-disable-next-line react/require-default-props
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const CardUser = () => undefined;

CardUser.Preview = ({ imageURL, fullName, isDarkTheme = false }: IPropsCardPreview) => (
  <div className={`card-user ${isDarkTheme ? 'card-user_theme_dark' : ''}`}>
    <div className="card-user__image">
      <img src={imageURL} alt="img" />
    </div>
    <div className={`card-user__text ${isDarkTheme ? 'card-user__text_theme_dark' : ''}`}>
      {fullName}
    </div>
  </div>
);

CardUser.Edit = ({ onClick }: IPropsEdit) => {
  const { t } = useTranslation();

  return (
    <div className="card-user-full__edit" onClick={onClick}>
      <EditOutlined />
      <span>{t('cardUserProfile.edit')}</span>
    </div>
  );
};

CardUser.Full = ({
  id, imageURL, fullName, gender, dateOfRegister, dateOfBirth, email, phone, edit, isDarkTheme = false
}: IPropsCardFull) => {
  const { t } = useTranslation();

  return (
    <div className={`card-user-full ${isDarkTheme ? 'card-user-full_theme_dark' : ''}`}>
      <div className="card-user-full__body">
        <div className="card-user-full__image">
          <img src={imageURL} alt="img-user" />
        </div>
        <div className="card-user-full__content">
          <div>
            <h2 className="card-user-full__title">{fullName}</h2>
            <div className="card-user-full__info">
              <p className="card-user-full__text">
                <b>{`${t('cardUserProfile.gender')} `}</b>
                {gender}
              </p>
              <p className="card-user-full__text">
                <b>{`${t('cardUserProfile.dateOfBirth')} `}</b>
                {dateOfBirth}
              </p>
              <p className="card-user-full__text">
                <b>{`${t('cardUserProfile.dateOfRegistration')} `}</b>
                {dateOfRegister}
              </p>
              <p className="card-user-full__text">
                <b>{`${t('cardUserProfile.email')} `}</b>
                {email}
              </p>
              <p className="card-user-full__text">
                <b>{`${t('cardUserProfile.phone')} `}</b>
                {phone}
              </p>
            </div>
          </div>
          <div>
            <p className="card-user-full__text">
              <b>{`${t('cardUserProfile.id')} `}</b>
              {id}
            </p>
          </div>
        </div>
      </div>
      {edit}
    </div>
  );
};

export default CardUser;
