import React, { useContext, useEffect } from 'react';
import './Auth.scss';
import {
  Alert, Button, Form, Input
} from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
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

  const themeCheckboxContext = useContext(ThemeCheckboxContext);

  const handleFinishForm = () => {
    if (!cookies.user_id) {
      loginUserFormAC(form.getFieldValue('userID'));
    }
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
          Вход
        </h2>
        <Form form={form} name="formAuthUser" layout="vertical" onFinish={handleFinishForm}>
          <Form.Item
            className={`user-auth__field ${themeCheckboxContext.isDarkTheme ? 'user-auth__field_theme_dark' : ''}`}
            name="userID"
            label={<b>ID:</b>}
            rules={[{
              required: true, message: 'Заполните данное поле'
            }]}
          >
            <Input type="text" placeholder="Введите свой ID" />
          </Form.Item>
          <Form.Item>
            <Button
              loading={isLoading}
              type="primary"
              block
              htmlType="submit"
              className="user-auth__button"
            >
              Войти
            </Button>
            <p
              className={`user-auth__info ${
                themeCheckboxContext.isDarkTheme ? 'user-auth__info_theme_dark' : ''
              }`}
            >
              Еще нет аккаунта?
              {' '}
              <Link to="/register">Зарегистрироваться</Link>
            </p>
            {(error !== undefined && !loginUser.id) && (
              <Alert message="Введен неверный ID, повторите авторизацию" type="error" />
            )}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
