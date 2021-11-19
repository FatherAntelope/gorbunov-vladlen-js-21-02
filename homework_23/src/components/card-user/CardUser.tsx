import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './CardUser.css';
import { Alert } from 'antd';
import Spinner from '../spinner/Spinner';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';

interface IProps {
  themeDark?: boolean;
}

interface IParams {
  id: string;
}

const CardUser = ({ themeDark }: IProps) => {
  const params = useParams<IParams>();
  const { userData, isLoading, error } = useTypedSelector((state) => state.user);
  const { loadUserFullAC } = useActions();

  const history = useHistory();

  useEffect(() => {
    loadUserFullAC(params.id);
  }, []);

  if (isLoading) {
    return <Spinner themeDark={themeDark} />;
  }

  if (error !== undefined) {
    return <Alert message={error} type="error" showIcon />;
  }

  return (
    <div className={`card-user  ${themeDark ? 'card-user_theme_dark' : ''}`}>
      <button
        type="button"
        className={`card-user__button ${themeDark ? 'card-user__button_theme_dark' : ''}`}
        onClick={history.goBack}
      >
        Назад
      </button>
      <p className="card-user__header">
        {userData?.id}
      </p>
      <div className="card-user__body">
        <div className="card-user__image">
          <img src={userData?.picture} alt="user-img" />
        </div>
        <div className={`card-user__info  ${themeDark ? 'card__info_theme_dark' : ''}`}>
          <div>
            <p className="card-user__text card-user__text_bolder card-user__text_size_big">
              {`${userData?.title ? `${userData?.title}.` : ''} ${userData?.firstName} ${userData?.lastName}`}
            </p>
            <p className="card-user__text">
              <span className="card-user__text card-user__text_bolder">Пол: </span>
              {`${userData?.gender || '-'}`}
            </p>
            <p className="card-user__text">
              <span className="card-user__text card-user__text_bolder">Дата рождения: </span>
              {`${userData?.dateOfBirth ? new Date(userData?.dateOfBirth).toDateString() : '-'}`}
            </p>
            <p className="card-user__text">
              <span className="card-user__text card-user__text_bolder">Дата регистрации: </span>
              {`${userData?.registerDate ? new Date(userData?.registerDate).toDateString() : '-'}`}
            </p>
            <br />
            <br />
            <p className="card-user__text">
              <span className="card-user__text card-user__text_bolder">Почта: </span>
              {`${userData?.email || '-'}`}
            </p>
            <p className="card-user__text">
              <span className="card-user__text card-user__text_bolder">Телефон: </span>
              {`${userData?.phone || '-'}`}
            </p>
          </div>
          <div>
            <p className="card-user__text card-user__text_bolder card-user__text_size_big">
              Адрес
            </p>
            <p className="card-user__text">
              <span className="card-user__text card-user__text_bolder">Государство: </span>
              {`${userData?.location?.state || '-'}`}
            </p>
            <p className="card-user__text">
              <span className="card-user__text card-user__text_bolder">Страна: </span>
              {`${userData?.location?.country || '-'}`}
            </p>
            <p className="card-user__text">
              <span className="card-user__text card-user__text_bolder">Город: </span>
              {`${userData?.location?.city || '-'}`}
            </p>
            <p className="card-user__text">
              <span className="card-user__text card-user__text_bolder">Улица: </span>
              {`${userData?.location?.street || '-'}`}
            </p>
            <p className="card-user__text">
              <span className="card-user__text card-user__text_bolder">UTC: </span>
              {`${userData?.location?.timezone || '-'}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

CardUser.defaultProps = {
  themeDark: false
};

export default CardUser;
