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

class Card extends React.Component<IProps> {
  render() {
    return (
      <div className={`card  ${this.props.themeDark ? 'card_theme_dark' : ''}`}>
        <div className="card__user-image">
          <img src={this.props.imgUrl} alt="user-img" />
        </div>
        <div className={`card__info  ${this.props.themeDark ? 'card__info_theme_dark' : ''}`}>
          <p className="card__user-id">
            {this.props.cardUserId}
          </p>
          <p className="card__user-name">
            {`${this.props.cardUserTitle}. ${this.props.cardUserFirstName} ${this.props.cardUserLastName}`}
          </p>
        </div>
      </div>
    );
  }
}

export default Card;
