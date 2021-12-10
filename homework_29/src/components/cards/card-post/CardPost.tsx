import React from 'react';
import { Avatar } from 'antd';
import './CardPost.scss';

interface IPropsCardPreview {
  text: string;
  userAvatarURL: string;
  userFullName: React.ReactNode;
  dateOfPublication: string;
  // eslint-disable-next-line react/require-default-props
  children?: React.ReactNode;
  // eslint-disable-next-line react/require-default-props
  isDarkTheme?: boolean;
}

interface IPropsCardBig {
  text: string;
  // eslint-disable-next-line react/require-default-props
  children?: React.ReactNode;
  // eslint-disable-next-line react/require-default-props
  isDarkTheme?: boolean;
}

interface IPropsHeaderBig {
  userAvatarURL: string;
  userFullName: React.ReactNode;
  dateOfPublication: string;
  // eslint-disable-next-line react/require-default-props
  isDarkTheme?: boolean;
}

interface IPropsImage {
  imageURL: string;
}

interface IPropsCardMini {
  text: string;
  // eslint-disable-next-line react/require-default-props
  children?: React.ReactNode;
  // eslint-disable-next-line react/require-default-props
  isDarkTheme?: boolean;
}

const CardPost = () => undefined;

CardPost.Big = ({
  text, children, isDarkTheme = false
}: IPropsCardBig) => (
  <div className={`card-post card-post_big ${isDarkTheme ? 'card-post_theme_dark' : ''}`}>
    {children}
    <p className="card-post__text_big">
      {text}
    </p>
  </div>
);

CardPost.Preview = ({
  text, userAvatarURL, userFullName, dateOfPublication, children, isDarkTheme = false
}: IPropsCardPreview) => (
  <div className={`card-post ${isDarkTheme ? 'card-post_theme_dark' : ''}`}>
    <div className="card-post__header">
      <Avatar src={userAvatarURL} />
      <div className="card-post__info">
        <div className={`card-post__title ${isDarkTheme ? 'card-post__title_theme_dark' : ''}`}>
          {userFullName}
        </div>
        <p className={`card-post__subtitle ${isDarkTheme ? 'card-post__subtitle_theme_dark' : ''}`}>
          {dateOfPublication}
        </p>
      </div>
    </div>
    {children}
    <p className="card-post__text">
      {text}
    </p>
  </div>
);

CardPost.Image = ({ imageURL }: IPropsImage) => (
  <div className="card-post__image">
    <img src={imageURL} alt="img" />
  </div>
);

CardPost.ImageBig = ({ imageURL }: IPropsImage) => (
  <div className="card-post__image card-post__image_big">
    <img src={imageURL} alt="img" />
  </div>
);

CardPost.HeaderBig = ({
  userAvatarURL, userFullName, dateOfPublication, isDarkTheme = false
}: IPropsHeaderBig) => (
  <div className="card-post__header">
    <Avatar src={userAvatarURL} style={{ width: 32 }} />
    <div className="card-post__info card-post__info_big">
      <div className={`card-post__title card-post__title_big ${isDarkTheme ? 'card-post__title_theme_dark' : ''}`}>
        {userFullName}
      </div>
      <p
        className={
        `card-post__subtitle card-post__subtitle_big ${isDarkTheme ? 'card-post__subtitle_theme_dark' : ''}`
        }
      >
        {dateOfPublication}
      </p>
    </div>
  </div>
);

CardPost.Mini = ({ text, children, isDarkTheme = false }: IPropsCardMini) => (
  <div className={`card-post ${isDarkTheme ? 'card-post_theme_dark' : ''}`}>
    {children}
    <p className="card-post__text">
      {text}
    </p>
  </div>
);

export default CardPost;
