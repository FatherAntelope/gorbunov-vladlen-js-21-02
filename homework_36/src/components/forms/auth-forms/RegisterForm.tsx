import React, { useContext, useEffect } from 'react';
import './Auth.scss';
import moment from 'moment';
import {
  Alert,
  Button, DatePicker, Form, Input, Radio
} from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { ICreateUser } from '../../../types/api/localServer';
import { useActions } from '../../../hooks/useActions';
import { COOKIE_LIFETIME, MAXIMUM_DATE } from '../../../constants/common';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { ThemeCheckboxContext } from '../../../contexts/theme-checkbox/ThemeCheckboxContext';
import { getObjectSendDataUser } from '../../../utils/common';

const RegisterForm = () => {
  const [form] = Form.useForm();
  const [cookies, setCookies] = useCookies();
  const localeHistory = useHistory();
  const { sendUser, error, isLoading } = useTypedSelector((state) => state.sendUserForm);
  const { registerUserFormAction, loginUserSetValuesFormAC, clearSendDataUserFormAction } = useActions();
  const { t } = useTranslation();

  const themeCheckboxContext = useContext(ThemeCheckboxContext);

  const handleFinishForm = () => {
    const formData: ICreateUser = form.getFieldsValue();
    registerUserFormAction(getObjectSendDataUser(formData));
  };

  useEffect(() => {
    if (cookies.user_id && cookies.user_first_name && cookies.user_picture) {
      localeHistory.push(`/user/${cookies.user_id}`);
    }
  }, []);

  useEffect(() => {
    if (
      error === undefined && sendUser.id && (
        cookies.user_id === undefined || cookies.user_first_name === undefined || cookies.user_picture === undefined
      )
    ) {
      setCookies('user_id', sendUser.id, { maxAge: COOKIE_LIFETIME });
      setCookies('user_first_name', sendUser.firstName, { maxAge: COOKIE_LIFETIME });
      setCookies('user_picture', sendUser.picture, { maxAge: COOKIE_LIFETIME });
      loginUserSetValuesFormAC(sendUser.id, sendUser.picture, sendUser.firstName);
      localeHistory.push(`/user/${sendUser.id}`);
      clearSendDataUserFormAction();
    }
  }, [sendUser.id]);

  return (
    <div className="user-auth">
      <div className="user-auth__body">
        <h2 className={`user-auth__header ${themeCheckboxContext.isDarkTheme ? 'user-auth__header_theme_dark' : ''}`}>
          {t('authorization.registration.title')}
        </h2>
        <Form form={form} name="formRegisterUser" layout="vertical" onFinish={handleFinishForm}>
          <Form.Item
            className={`user-auth__field ${themeCheckboxContext.isDarkTheme ? 'user-auth__field_theme_dark' : ''}`}
            name="firstName"
            hasFeedback
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
            hasFeedback
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
            hasFeedback
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
            hasFeedback
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
            name="email"
            label={<b>{t('authorization.registration.formField.email.label')}</b>}
            hasFeedback
            rules={[
              {
                required: true,
                message: t('authorization.registration.formField.email.error.required')
              },
              {
                type: 'email',
                message: t('authorization.registration.formField.email.error.type')
              }
            ]}
          >
            <Input
              type="email"
              placeholder={t('authorization.registration.formField.email.placeholder')}
            />
          </Form.Item>
          <Form.Item
            className={`user-auth__field ${themeCheckboxContext.isDarkTheme ? 'user-auth__field_theme_dark' : ''}`}
            name="phone"
            hasFeedback
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
            <Input
              type="tel"
              placeholder={t('authorization.registration.formField.phone.placeholder')}
            />
          </Form.Item>
          <Form.Item>
            <Button
              loading={isLoading}
              type="primary"
              block
              htmlType="submit"
              className="user-auth__button"
            >
              {t('authorization.registration.button')}
            </Button>
            <p
              className={`user-auth__info ${
                themeCheckboxContext.isDarkTheme ? 'user-auth__info_theme_dark' : ''
              }`}
            >
              {t('authorization.registration.info.text')}
              {' '}
              <Link to="/login">{t('authorization.registration.info.link')}</Link>
            </p>
            {(error !== undefined && !sendUser.id) && (
              <Alert message={t('authorization.registration.error')} type="error" />
            )}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;
