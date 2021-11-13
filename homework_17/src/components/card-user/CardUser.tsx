import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { fetchUserData, IUserFull } from '../../utils/fetchDumMyApi';
import './CardUser.css';
import { ThemeDarkContext } from '../../contexts/theme-checkbox/ThemeCheckboxContext';
import Spinner from '../spinner/Spinner';

interface IParams {
  id: string;
}

const CardUser = () => {
  const themeDarkContext = useContext(ThemeDarkContext);
  const params = useParams<IParams>();
  const [user, setUser] = useState({} as IUserFull);
  const [loading, setLoading] = useState(true as boolean);

  const history = useHistory();

  const loadUserData = (id: string) => fetchUserData(
    id,
    setUser,
    () => { throw new Error('Ошибка загрузки пользователя'); },
    () => setLoading(false)
  );

  useEffect(() => {
    loadUserData(params.id);
    setLoading(true);
  }, []);

  return (
    loading
      ? (
        <Spinner />
      )
      : (
        <div className={`card-user  ${themeDarkContext.themeDark ? 'card-user_theme_dark' : ''}`}>
          <button
            type="button"
            className={`card-user__button ${themeDarkContext.themeDark ? 'card-user__button_theme_dark' : ''}`}
            onClick={history.goBack}
          >
            Назад
          </button>
          <p className="card-user__header">
            {user.id}
          </p>
          <div className="card-user__body">
            <div className="card-user__image">
              <img src={user.picture} alt="user-img" />
            </div>
            <div className={`card-user__info  ${themeDarkContext.themeDark ? 'card__info_theme_dark' : ''}`}>
              <div>
                <p className="card-user__text card-user__text_bolder card-user__text_size_big">
                  {`${user.title}. ${user.firstName} ${user.lastName}`}
                </p>
                <p className="card-user__text">
                  <span className="card-user__text card-user__text_bolder">Пол: </span>
                  {`${user?.gender || '-'}`}
                </p>
                <p className="card-user__text">
                  <span className="card-user__text card-user__text_bolder">Дата рождения: </span>
                  {`${new Date(user?.dateOfBirth).toDateString() || '-'}`}
                </p>
                <p className="card-user__text">
                  <span className="card-user__text card-user__text_bolder">Дата регистрации: </span>
                  {`${new Date(user?.registerDate).toDateString() || '-'}`}
                </p>
                <br />
                <br />
                <p className="card-user__text">
                  <span className="card-user__text card-user__text_bolder">Почта: </span>
                  {`${user?.email || '-'}`}
                </p>
                <p className="card-user__text">
                  <span className="card-user__text card-user__text_bolder">Телефон: </span>
                  {`${user?.phone || '-'}`}
                </p>
              </div>
              <div>
                <p className="card-user__text card-user__text_bolder card-user__text_size_big">
                  Адрес
                </p>
                <p className="card-user__text">
                  <span className="card-user__text card-user__text_bolder">Государство: </span>
                  {`${user.location?.state || '-'}`}
                </p>
                <p className="card-user__text">
                  <span className="card-user__text card-user__text_bolder">Страна: </span>
                  {`${user.location?.country || '-'}`}
                </p>
                <p className="card-user__text">
                  <span className="card-user__text card-user__text_bolder">Город: </span>
                  {`${user.location?.city || '-'}`}
                </p>
                <p className="card-user__text">
                  <span className="card-user__text card-user__text_bolder">Улица: </span>
                  {`${user.location?.street || '-'}`}
                </p>
                <p className="card-user__text">
                  <span className="card-user__text card-user__text_bolder">UTC: </span>
                  {`${user.location?.timezone || '-'}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      )
  );
};

export default CardUser;
