import React from 'react';
import './Card.css';

interface IProps {
  imgUrl?: string;
  cardUserId?: string;
  cardUserTitle?: string;
  cardUserFirstName?: string;
  cardUserLastName?: string;
  themeDark?: boolean;
}

const Card = ({
  imgUrl, cardUserId, cardUserTitle, cardUserFirstName, cardUserLastName, themeDark
}: IProps) => (
  <div className={`card  ${themeDark ? 'card_theme_dark' : ''}`}>
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

Card.defaultProps = {
  imgUrl: '',
  cardUserId: '',
  cardUserTitle: '',
  cardUserFirstName: '',
  cardUserLastName: '',
  themeDark: false
};

export default Card;
