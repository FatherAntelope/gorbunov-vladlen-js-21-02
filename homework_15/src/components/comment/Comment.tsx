import React from 'react';
import './Comment.css';

class Comment extends React.Component {
  render() {
    return (
      <div className="comment comment_theme_dark">
        <div className="comment__user-image">
          <img src="https://randomuser.me/api/portraits/women/58.jpg" alt="user-img" />
        </div>
        <div className="comment__info comment__info_theme_dark">
          <p className="comment__user-id">
            60d0fe4f5311236168a109cb
          </p>
          <p className="comment__user-name">
            miss. Edita Vestering
          </p>
        </div>
      </div>
    );
  }
}

export default Comment;
