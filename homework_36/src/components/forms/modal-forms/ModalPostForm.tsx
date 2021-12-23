import React, { useContext, useEffect } from 'react';
import Modal from '../../modal/Modal';
import CommentsForm from '../comments-form/CommentsForm';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useActions } from '../../../hooks/useActions';
import PostForm from '../post-form/PostForm';
import { FORM_LIMIT_POST_COMMENTS, ModalID } from '../../../constants/common';
import { ThemeCheckboxContext } from '../../../contexts/theme-checkbox/ThemeCheckboxContext';

const ModalPostForm = () => {
  const modals = useTypedSelector((state) => state.modalsForm);
  const modalPostStore = modals[ModalID.POSTS];
  const { loadPostFormAC, closeModalsFormAC, loadPostCommentsFormAC } = useActions();
  const themeCheckboxContext = useContext(ThemeCheckboxContext);

  useEffect(() => {
    if (modalPostStore?.modalData?.postID !== undefined && modalPostStore?.isActive) {
      loadPostFormAC(modalPostStore?.modalData?.postID);
      loadPostCommentsFormAC(modalPostStore?.modalData?.postID, 0, FORM_LIMIT_POST_COMMENTS);
    }
  }, [modalPostStore?.modalData]);

  useEffect(() => () => {
    closeModalsFormAC();
  }, []);

  return (
    <Modal isActive={modalPostStore?.isActive} isDarkTheme={themeCheckboxContext.isDarkTheme}>
      <PostForm />
      <CommentsForm />
    </Modal>
  );
};

export default ModalPostForm;
