import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Alert } from 'antd';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { useActions } from '../../../../hooks/useActions';
import { IResponsePostUser } from '../../../../types/api/localServer';
import CardPost from '../../../cards/card-post/CardPost';
import { FORM_LIMIT_USER_POSTS, ModalID } from '../../../../constants/common';
import '../../../flex-grid/FlexGrid.scss';
import Preloader from '../../../preloader/Preloader';
import { ThemeCheckboxContext } from '../../../../contexts/theme-checkbox/ThemeCheckboxContext';
import PaginationWrapper from '../../../PaginationWrapper/PaginationWrapper';

interface ISearchParams {
  id: string;
}

const UserPostsForm = () => {
  const searchParams = useParams<ISearchParams>();
  const { userPosts, isLoading, error } = useTypedSelector((state) => state.userPostsForm);
  const { loadUserPostsFormAC, openModalsFormAC } = useActions();
  const themeCheckboxContext = useContext(ThemeCheckboxContext);

  const handlePaginationChange = (e: number) => {
    loadUserPostsFormAC(searchParams.id, e - 1, FORM_LIMIT_USER_POSTS);
  };

  const handleOpenModal = (id: string) => {
    openModalsFormAC(ModalID.POSTS_USER, { postID: id });
  };

  if (isLoading) {
    return <div style={{ height: 200 }}><Preloader isDarkTheme={themeCheckboxContext.isDarkTheme} /></div>;
  }

  if (error !== undefined) {
    return <Alert message={error} type="error" showIcon />;
  }

  return (
    <>
      <div className="row">
        {userPosts.data.map((item: IResponsePostUser) => (
          <div className="col-4" key={item.id}>
            <CardPost.Mini
              isDarkTheme={themeCheckboxContext.isDarkTheme}
              text={item.text}
            >
              <div style={{ width: '100%', cursor: 'pointer' }} onClick={() => handleOpenModal(item.id)}>
                <CardPost.Image imageURL={item.image} />
              </div>
            </CardPost.Mini>
          </div>
        ))}
      </div>
      {userPosts.total > FORM_LIMIT_USER_POSTS && (
      <div className="row row__justify_end">
        <PaginationWrapper
          pageSize={userPosts.limit}
          total={userPosts.total}
          current={userPosts.page + 1}
          onChange={handlePaginationChange}
          isDarkTheme={themeCheckboxContext.isDarkTheme}
        />
      </div>
      )}
    </>
  );
};

export default UserPostsForm;
