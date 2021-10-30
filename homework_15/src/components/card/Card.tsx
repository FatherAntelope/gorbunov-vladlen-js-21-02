import React from 'react';
import './Card.css';

class Card extends React.Component {
  render() {
    return (
      <div className="card card_theme_dark">
        <div className="card__user-image">
          <img src="https://randomuser.me/api/portraits/women/58.jpg" alt="user-img" />
        </div>
        <div className="card__info card__info_theme_dark">
          <p className="card__user-id">
            60d0fe4f5311236168a109cb
          </p>
          <p className="card__user-name">
            miss. Edita Vestering
          </p>
        </div>
      </div>
    );
  }
}

export default Card;
