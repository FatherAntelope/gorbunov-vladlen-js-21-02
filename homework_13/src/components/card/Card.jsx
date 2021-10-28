import React from "react";
import "./Card.css";

class Card extends React.Component {
  render() {
    let img = null;
    let link = null;
    let description = null;
    let button = null;

    if(this.props.imgSrc) {
      img = <div className="card__image"><img src={this.props.imgSrc} alt={this.props.imgAlt}/></div>;
    }
    if(this.props.link && this.props.linkText) {
      link = <a href={this.props.link} className="card__link">{this.props.linkText}</a>;
    }
    if(this.props.description) {
      description = <p className="card__description">{this.props.description}</p>;
    }
    if(this.props.buttonText) {
      button = <button className="card__button ">{this.props.buttonText}</button>
    }

    return (
      <div className="card">
        {img}
        <div className="card__body">
          <div className="card__info">
            {link}
            {description}
          </div>
          {button}
        </div>
      </div>
    );
  }
}

export default Card;