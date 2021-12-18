import React, { useContext, useEffect } from 'react';
import Modal from '../../modal/Modal';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useActions } from '../../../hooks/useActions';
import { ModalID } from '../../../constants/common';
import CardUserEdit from '../../cards/card-user-edit/CardUserEdit';
import { ThemeCheckboxContext } from '../../../contexts/theme-checkbox/ThemeCheckboxContext';

const ModalPostForm = () => {
  const modals = useTypedSelector((state) => state.modalsForm);
  const { user } = useTypedSelector((state) => state.userFullForm);
  const [firstName, lastName] = user.fullName.split(' ');
  const modalOpenUpdateUserStore = modals[ModalID.UPDATE_USER];
  const { closeModalsFormAC } = useActions();
  const themeCheckboxContext = useContext(ThemeCheckboxContext);

  useEffect(() => () => {
    closeModalsFormAC();
  }, []);

  return (
    <Modal
      isActive={modalOpenUpdateUserStore?.isActive}
      isDarkTheme={themeCheckboxContext.isDarkTheme}
      size="mini"
    >
      <CardUserEdit
        avatar={user.picture}
        gender={user.gender}
        firstName={firstName}
        lastName={lastName}
        dateOfBirth={user.dateOfBirthOriginal}
        phone={user.phone}
      />
    </Modal>
  );
};

export default ModalPostForm;
