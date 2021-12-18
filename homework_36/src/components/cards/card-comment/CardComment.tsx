import React from 'react';
import './CardComment.scss';
import { Avatar } from 'antd';

interface IProps {
  text: string;
  userAvatarURL: string;
  userFullName: React.ReactNode;
  dateOfPublication: string;
  isDarkTheme?: boolean;
}

const CardComment = ({
  text, userAvatarURL, userFullName, dateOfPublication, isDarkTheme
}: IProps) => (
  <div className={`card-comment ${isDarkTheme ? 'card-comment_theme_dark' : ''}`}>
    <div className="card-comment__content">
      <div className="card-comment__avatar">
        <Avatar src={userAvatarURL} />
      </div>
      <div className="card-comment__body">
        <div className="card-comment__info">
          <div className={`card-comment__name ${isDarkTheme ? 'card-comment__name_theme_dark' : ''}`}>
            {userFullName}
          </div>
          <div className={`card-comment__date ${isDarkTheme ? 'card-comment__name_theme_date' : ''}`}>
            {dateOfPublication}
          </div>
        </div>
        <p className="card-comment__text">{text}</p>
      </div>
    </div>
  </div>
);

CardComment.defaultProps = {
  isDarkTheme: false
};

export default CardComment;
