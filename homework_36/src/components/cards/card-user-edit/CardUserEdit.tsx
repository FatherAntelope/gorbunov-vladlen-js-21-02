import React, { useContext, useEffect } from 'react';
import './CardUserEdit.scss';
import '../../forms/auth-forms/Auth.scss';
import {
  Alert,
  Button, DatePicker, Form, Input, message, Radio, Upload
} from 'antd';
import moment from 'moment';
import { UploadOutlined } from '@ant-design/icons';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { COOKIE_LIFETIME, EMPTY_STRING, MAXIMUM_DATE } from '../../../constants/common';
import { ThemeCheckboxContext } from '../../../contexts/theme-checkbox/ThemeCheckboxContext';
import { checkPictureAndGet, getObjectSendDataUser } from '../../../utils/common';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';

interface IProps {
  avatar: string;
  gender: 'male' | 'female' | 'other' | '';
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phone: string;
}

const CardUserEdit = ({
  avatar, gender, firstName, lastName, dateOfBirth, phone
}: IProps) => {
  const [formEditDataUser] = Form.useForm();
  const themeCheckboxContext = useContext(ThemeCheckboxContext);
  const {
    updateUserFormAction, loadUserFullFormAC, clearSendDataUserFormAction, uploadImageEditAC, clearImageEditFormAC
  } = useActions();
  const [cookies, setCookies] = useCookies();
  const sendData = useTypedSelector((state) => state.sendUserForm);
  const sendImage = useTypedSelector((state) => state.imageEditForm);
  const { t } = useTranslation();

  useEffect(() => {
    if (firstName && lastName) {
      formEditDataUser.setFields([
        { name: 'firstName', value: firstName },
        { name: 'lastName', value: lastName },
        { name: 'gender', value: gender },
        { name: 'dateOfBirth', value: dateOfBirth && moment(dateOfBirth) },
        { name: 'phone', value: phone }
      ]);
    }
  }, [firstName, lastName]);

  const handleClickEditDataUser = () => {
    const newDataUser = getObjectSendDataUser(formEditDataUser.getFieldsValue());
    updateUserFormAction(cookies.user_id, newDataUser);
  };

  const handleClickDeleteImage = () => {
    updateUserFormAction(cookies.user_id, { picture: EMPTY_STRING });
  };

  const beforeUploadCallback = (file: any) => {
    const imgType = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
    const imgSize = file.size / 1024 / 1024 < 2;

    if (!imgType) {
      message.error(t('cardUserEdit.errorPhoto.format'));
    }
    if (!imgSize) {
      message.error(t('cardUserEdit.errorPhoto.size'));
    }

    return imgType && imgSize;
  };

  const customRequestCallback = (info: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(info.file as Blob);
    reader.onloadend = (e: any) => {
      uploadImageEditAC(cookies.user_id, e.target.result);
    };
  };

  useEffect(() => {
    if (sendData.sendUser.id) {
      const userFullNamePieces: string[] = sendData.sendUser.fullName.split(' ');
      setCookies('user_id', cookies.user_id, { maxAge: COOKIE_LIFETIME });
      setCookies('user_first_name', userFullNamePieces[0], { maxAge: COOKIE_LIFETIME });
      setCookies('user_picture', sendData.sendUser.picture, { maxAge: COOKIE_LIFETIME });
      loadUserFullFormAC(cookies.user_id);
      clearSendDataUserFormAction();
    }
  }, [sendData.sendUser.id]);

  useEffect(() => {
    if (sendImage.editImageURL) {
      updateUserFormAction(cookies.user_id, { picture: sendImage.editImageURL });
      clearImageEditFormAC();
    }
  }, [sendImage.editImageURL]);

  return (
    <div className="user-edit-form">
      <div className="user-edit-form__header">
        <div className="user-edit-form__image">
          <img src={checkPictureAndGet(avatar)} alt="user-img" />
        </div>
      </div>

      <div className="user-edit-form__image-edit">
        <Upload
          name="file"
          multiple={false}
          accept="image/jpeg, image/png"
          showUploadList={false}
          beforeUpload={beforeUploadCallback}
          customRequest={customRequestCallback}
        >
          <Button loading={sendImage.isLoading} size="small" icon={<UploadOutlined />}>
            {t('cardUserEdit.button.updatePhoto')}
          </Button>
        </Upload>

        {avatar && (
          <Button size="small" id="buttonDeletePhoto" onClick={handleClickDeleteImage}>
            {t('cardUserEdit.button.deletePhoto')}
          </Button>
        )}
      </div>
      {(sendImage.error !== undefined && !sendImage.editImageURL) && (
        <Alert message={sendImage.error} type="error" />
      )}

      <Form
        form={formEditDataUser}
        id="formEditDataUser"
        name="formEditDataUser"
        layout="vertical"
        onError={handleClickEditDataUser} // для теста
        onFinish={handleClickEditDataUser}
      >
        <Form.Item
          className={`user-auth__field ${themeCheckboxContext.isDarkTheme ? 'user-auth__field_theme_dark' : ''}`}
          name="firstName"
          label={<b>{t('authorization.registration.formField.firstName.label')}</b>}
          rules={[
            {
              required: true,
              message: t('authorization.registration.formField.firstName.error.required')
            },
            {
              whitespace: true,
              message: t('authorization.registration.formField.firstName.error.spacing')
            },
            {
              pattern: new RegExp(/^[А-яЁёA-z]+$/, 'g'),
              message: t('authorization.registration.formField.firstName.error.symbols')
            },
            {
              min: 2, max: 50, message: t('authorization.registration.formField.firstName.error.length')
            }
          ]}
        >
          <Input
            type="text"
            placeholder={t('authorization.registration.formField.firstName.placeholder')}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item
          className={`user-auth__field ${themeCheckboxContext.isDarkTheme ? 'user-auth__field_theme_dark' : ''}`}
          name="lastName"
          label={<b>{t('authorization.registration.formField.lastName.label')}</b>}
          rules={[
            {
              required: true,
              message: t('authorization.registration.formField.lastName.error.required')
            },
            {
              whitespace: true,
              message: t('authorization.registration.formField.lastName.error.spacing')
            },
            {
              pattern: new RegExp(/^[А-яЁёA-z]+$/, 'g'),
              message: t('authorization.registration.formField.lastName.error.symbols')
            },
            {
              min: 2, max: 50, message: t('authorization.registration.formField.lastName.error.length')
            }
          ]}
        >
          <Input
            type="text"
            placeholder={t('authorization.registration.formField.lastName.placeholder')}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item
          className={`
              user-auth__field user-auth__field_inline
              ${themeCheckboxContext.isDarkTheme ? 'user-auth__field_theme_dark' : ''}
            `}
          name="gender"
          label={<b>{t('authorization.registration.formField.gender.label')}</b>}
          rules={[
            {
              required: true,
              message: t('authorization.registration.formField.gender.error.required')
            }
          ]}
        >
          <Radio.Group>
            <Radio value="male">{t('authorization.registration.formField.gender.radioText.male')}</Radio>
            <Radio value="female">{t('authorization.registration.formField.gender.radioText.female')}</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          className={`user-auth__field ${themeCheckboxContext.isDarkTheme ? 'user-auth__field_theme_dark' : ''}`}
          name="dateOfBirth"
          label={<b>{t('authorization.registration.formField.dateOfBirth.label')}</b>}
          rules={[
            {
              required: true,
              message: t('authorization.registration.formField.dateOfBirth.error.required')
            },
          ]}
        >
          <DatePicker
            style={{ width: '100%' }}
            format="DD.MM.YYYY"
            picker="date"
            placeholder={t('authorization.registration.formField.dateOfBirth.placeholder')}
            disabledDate={(item) => !item || item.isAfter(MAXIMUM_DATE) || item.isSameOrBefore('1960-01-01')}
            defaultPickerValue={moment(MAXIMUM_DATE)}
          />
        </Form.Item>
        <Form.Item
          className={`user-auth__field ${themeCheckboxContext.isDarkTheme ? 'user-auth__field_theme_dark' : ''}`}
          name="phone"
          label={<b>{t('authorization.registration.formField.phone.label')}</b>}
          rules={[
            {
              required: true,
              message: t('authorization.registration.formField.phone.error.required')
            },
            {
              pattern: new RegExp(/^(\+)?[0-9-()]+$/, 'g'),
              message: t('authorization.registration.formField.phone.error.symbols')
            }
          ]}
        >
          <Input type="tel" placeholder="+79991234567" />
        </Form.Item>
        <Form.Item>
          <Button
            loading={sendData.isLoading}
            type="primary"
            block
            htmlType="submit"
            className="user-auth__button"
          >
            {t('cardUserEdit.button.save')}
          </Button>
          {(sendData.error !== undefined && !sendData.sendUser.id) && (
            <Alert message={sendData.error} type="error" />
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default CardUserEdit;
