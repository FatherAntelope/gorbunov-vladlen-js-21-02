import React, { useContext } from 'react';
import './Card.css';
import { ThemeDarkContext } from '../../contexts/theme-checkbox/ThemeCheckboxContext';

interface IProps {
  imgUrl?: string;
  cardUserId?: string;
  cardUserTitle?: string;
  cardUserFirstName?: string;
  cardUserLastName?: string;
}

const Card = ({
  imgUrl, cardUserId, cardUserTitle, cardUserFirstName, cardUserLastName
}: IProps) => {
  const themeDarkContext = useContext(ThemeDarkContext);
  return (
    <div className={`card  ${themeDarkContext.themeDark ? 'card_theme_dark' : ''}`}>
      <div className="card__user-image">
        <img src={imgUrl} alt="user-img" />
      </div>
      <div className="card__info">
        <p className="card__user-id">
          {cardUserId}
        </p>
        <p className="card__user-info">
          {`${cardUserTitle ? `${cardUserTitle}.` : ''} ${cardUserFirstName} ${cardUserLastName}`}
        </p>
      </div>
    </div>
  );
};

Card.defaultProps = {
  imgUrl: '',
  cardUserId: '',
  cardUserTitle: '',
  cardUserFirstName: '',
  cardUserLastName: ''
};

export default Card;
