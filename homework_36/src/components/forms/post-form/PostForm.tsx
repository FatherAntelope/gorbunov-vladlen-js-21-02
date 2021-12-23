import React, { useContext } from 'react';
import { Alert } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CardPost from '../../cards/card-post/CardPost';
import { checkPictureAndGet, getUserFullName } from '../../../utils/common';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import Preloader from '../../preloader/Preloader';
import Tooltip from '../../tooltip/Tooltip';
import { ThemeCheckboxContext } from '../../../contexts/theme-checkbox/ThemeCheckboxContext';

const PostForm = () => {
  const { post, isLoading, error } = useTypedSelector((state) => state.postForm);
  const themeCheckboxContext = useContext(ThemeCheckboxContext);
  const { t } = useTranslation();

  if (isLoading) {
    return <div style={{ height: 70 }}><Preloader isDarkTheme={themeCheckboxContext.isDarkTheme} /></div>;
  }

  if (error !== undefined) {
    return <Alert message={error} type="error" showIcon />;
  }

  return (
    <CardPost.Big
      isDarkTheme={themeCheckboxContext.isDarkTheme}
      text={post.text}
    >
      <CardPost.HeaderBig
        isDarkTheme={themeCheckboxContext.isDarkTheme}
        userAvatarURL={checkPictureAndGet(post.owner.picture)}
        dateOfPublication={post.publishDate}
        userFullName={(
          <Tooltip textInfo={post.owner.id} isDarkTheme={themeCheckboxContext.isDarkTheme}>
            <Link to={`/user/${post.owner.id}`}>
              {getUserFullName(
                t(`commons.userAppeal.${post.owner.title}`),
                post.owner.fullName
              )}
            </Link>
          </Tooltip>
        )}
      />
      <CardPost.ImageBig imageURL={checkPictureAndGet(post.image)} />
    </CardPost.Big>
  );
};

export default PostForm;
