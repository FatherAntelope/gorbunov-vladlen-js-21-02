import React, { useContext } from 'react';
import { useCookies } from 'react-cookie';
import { Alert } from 'antd';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import Preloader from '../../../preloader/Preloader';
import {
  checkPictureAndGet, getDateRU, getUserFullName
} from '../../../../utils/common';
import CardUser from '../../../cards/card-user/CardUser';
import '../../../flex-grid/FlexGrid.scss';
import { useActions } from '../../../../hooks/useActions';
import { ModalID } from '../../../../constants/common';
import { ThemeCheckboxContext } from '../../../../contexts/theme-checkbox/ThemeCheckboxContext';

const UserFullForm = () => {
  const [cookies] = useCookies();
  const { user, isLoading, error } = useTypedSelector((state) => state.userFullForm);
  const { openModalsFormAC } = useActions();
  const themeCheckboxContext = useContext(ThemeCheckboxContext);
  const { t } = useTranslation();

  const handleClickOpenModalUpdateUser = () => {
    openModalsFormAC(ModalID.UPDATE_USER, { userID: cookies.user_id });
  };

  if (isLoading) {
    return <div style={{ height: 316 }}><Preloader isDarkTheme={themeCheckboxContext.isDarkTheme} /></div>;
  }

  if (error !== undefined) {
    return <Alert message={error} type="error" showIcon />;
  }

  return (
    <div className="row">
      <CardUser.Full
        isDarkTheme={themeCheckboxContext.isDarkTheme}
        edit={
          (cookies.user_id === user.id) && (
            <CardUser.Edit onClick={handleClickOpenModalUpdateUser} />
          )
        }
        id={user.id}
        imageURL={checkPictureAndGet(user.picture)}
        fullName={getUserFullName(
          t(`commons.userAppeal.${user.title}`), user.firstName, user.lastName
        )}
        gender={t(`commons.userGender.${user.gender}`)}
        dateOfBirth={getDateRU(user.dateOfBirth)}
        dateOfRegister={getDateRU(user.registerDate)}
        email={user.email}
        phone={user.phone}
      />
    </div>
  );
};

export default UserFullForm;
