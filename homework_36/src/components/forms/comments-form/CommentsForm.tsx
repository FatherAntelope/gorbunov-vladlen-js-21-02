import React, { useContext } from 'react';
import '../../flex-grid/FlexGrid.scss';
import { Alert } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useActions } from '../../../hooks/useActions';
import CardComment from '../../cards/card-comment/CardComment';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { FORM_LIMIT_POST_COMMENTS, ModalID } from '../../../constants/common';
import { IResponseCommentPreview } from '../../../types/api/localServer';
import { getUserFullName } from '../../../utils/common';
import Preloader from '../../preloader/Preloader';
import Tooltip from '../../tooltip/Tooltip';
import { ThemeCheckboxContext } from '../../../contexts/theme-checkbox/ThemeCheckboxContext';
import PaginationWrapper from '../../PaginationWrapper/PaginationWrapper';

const CommentsForm = () => {
  const modals = useTypedSelector((state) => state.modalsForm);
  const modalPostUserStore = modals[ModalID.POSTS_USER];
  const { postComments, isLoading, error } = useTypedSelector((state) => state.postCommentsForm);
  const { loadPostCommentsFormAC, closeModalsFormAC } = useActions();
  const themeCheckboxContext = useContext(ThemeCheckboxContext);
  const { t } = useTranslation();

  const handlePaginationChange = (e: number) => {
    loadPostCommentsFormAC(modalPostUserStore?.modalData?.postID, e - 1, FORM_LIMIT_POST_COMMENTS);
  };

  if (isLoading) {
    return <div style={{ height: 70 }}><Preloader isDarkTheme={themeCheckboxContext.isDarkTheme} /></div>;
  }

  if (error !== undefined) {
    return <Alert message={error} type="error" showIcon />;
  }

  return (
    <>
      <div className="row">
        {postComments.data.map((item: IResponseCommentPreview) => (
          <div className="col-6" key={item.id}>
            <CardComment
              isDarkTheme={themeCheckboxContext.isDarkTheme}
              text={item.message}
              userAvatarURL={item.owner.picture}
              userFullName={(
                <Tooltip textInfo={item.owner.id} isDarkTheme={themeCheckboxContext.isDarkTheme}>
                  <Link to={`/user/${item.owner.id}`}>
                    <span onClick={closeModalsFormAC}>
                      {getUserFullName(
                        t(`commons.userAppeal.${item.owner.title}`),
                        item.owner.fullName
                      )}
                    </span>
                  </Link>
                </Tooltip>
              )}
              dateOfPublication={item.publishDate}
            />
          </div>
        ))}
      </div>
      {postComments.total > FORM_LIMIT_POST_COMMENTS && (
      <div className="row row__justify_end">
        <PaginationWrapper
          pageSize={postComments.limit}
          total={postComments.total}
          current={postComments.page + 1}
          onChange={handlePaginationChange}
          isDarkTheme={themeCheckboxContext.isDarkTheme}
        />
      </div>
      )}
    </>
  );
};

export default CommentsForm;
