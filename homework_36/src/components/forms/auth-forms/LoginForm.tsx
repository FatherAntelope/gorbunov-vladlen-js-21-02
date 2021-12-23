import React, { useContext, useEffect } from 'react';
import './Auth.scss';
import {
  Alert, Button, Form, Input
} from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { COOKIE_LIFETIME } from '../../../constants/common';
import { ThemeCheckboxContext } from '../../../contexts/theme-checkbox/ThemeCheckboxContext';

const LoginForm = () => {
  const [form] = Form.useForm();
  const [cookies, setCookies] = useCookies();
  const localeHistory = useHistory();
  const { loginUser, error, isLoading } = useTypedSelector((state) => state.loginUserForm);
  const { loginUserFormAC, clearLoginUserFormAC } = useActions();
  const { t } = useTranslation();

  const themeCheckboxContext = useContext(ThemeCheckboxContext);

  const handleFinishForm = () => {
    loginUserFormAC(form.getFieldValue('userID'));
  };

  useEffect(() => {
    if (cookies.user_id && cookies.user_first_name && cookies.user_picture) {
      localeHistory.push(`/user/${cookies.user_id}`);
    }
  }, []);

  useEffect(() => {
    if (
      error === undefined && loginUser.id && (
        cookies.user_id === undefined || cookies.user_first_name === undefined || cookies.user_picture === undefined
      )
    ) {
      setCookies('user_id', loginUser.id, { maxAge: COOKIE_LIFETIME });
      setCookies('user_first_name', loginUser.firstName, { maxAge: COOKIE_LIFETIME });
      setCookies('user_picture', loginUser.picture, { maxAge: COOKIE_LIFETIME });
      localeHistory.push(`/user/${loginUser.id}`);
      clearLoginUserFormAC();
    }
  }, [loginUser.id]);

  return (
    <div className="user-auth">
      <div className="user-auth__body">
        <h2 className={`user-auth__header ${themeCheckboxContext.isDarkTheme ? 'user-auth__header_theme_dark' : ''}`}>
          {t('authorization.login.title')}
        </h2>
        <Form
          form={form}
          name="formAuthUser"
          layout="vertical"
          id="formLoginUser"
          onFinish={handleFinishForm}
          onError={handleFinishForm}
        >
          <Form.Item
            className={`user-auth__field ${themeCheckboxContext.isDarkTheme ? 'user-auth__field_theme_dark' : ''}`}
            name="userID"
            label={<b>{t('authorization.login.formField.id.label')}</b>}
            rules={[{
              required: true, message: t('authorization.login.formField.id.error.required')
            }]}
          >
            <Input type="text" placeholder={t('authorization.login.formField.id.placeholder')} />
          </Form.Item>
          <Form.Item>
            <Button
              loading={isLoading}
              type="primary"
              block
              htmlType="submit"
              className="user-auth__button"
            >
              {t('authorization.login.button')}
            </Button>
            <p
              className={`user-auth__info ${
                themeCheckboxContext.isDarkTheme ? 'user-auth__info_theme_dark' : ''
              }`}
            >
              {t('authorization.login.info.text')}
              {' '}
              <Link to="/register">{t('authorization.login.info.link')}</Link>
            </p>
            {(error !== undefined && !loginUser.id) && (
              <Alert message={t('authorization.login.error')} type="error" />
            )}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
