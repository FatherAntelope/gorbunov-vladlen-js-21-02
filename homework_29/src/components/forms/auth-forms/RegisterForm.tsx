import React, { useContext, useEffect } from 'react';
import './Auth.scss';
import moment from 'moment';
import {
  Alert,
  Button, DatePicker, Form, Input, Radio
} from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { ICreateUser } from '../../../types/api/dumMyApi';
import { getJSONStringifyForRegisterUser } from '../../../utils/common';
import { useActions } from '../../../hooks/useActions';
import { COOKIE_LIFETIME, MAXIMUM_DATE } from '../../../constants/common';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { ThemeCheckboxContext } from '../../../contexts/theme-checkbox/ThemeCheckboxContext';

const RegisterForm = () => {
  const [form] = Form.useForm();
  const [cookies, setCookies] = useCookies();
  const localeHistory = useHistory();
  const { sendUser, error, isLoading } = useTypedSelector((state) => state.sendUserForm);
  const { registerUserFormAction, loginUserSetValuesFormAC, clearSendDataUserFormAction } = useActions();

  const themeCheckboxContext = useContext(ThemeCheckboxContext);

  const handleFinishForm = () => {
    const formData: ICreateUser = form.getFieldsValue();
    const formBody = getJSONStringifyForRegisterUser(formData);
    registerUserFormAction(formBody);
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
          Регистрация
        </h2>
        <Form form={form} name="formRegisterUser" layout="vertical" onFinish={handleFinishForm}>
          <Form.Item
            className={`user-auth__field ${themeCheckboxContext.isDarkTheme ? 'user-auth__field_theme_dark' : ''}`}
            name="firstName"
            hasFeedback
            label={<b>Имя:</b>}
            rules={[
              {
                required: true,
                message: 'Необходимо заполнить данное поле'
              },
              {
                whitespace: true,
                message: 'Поле не должно содержать лишние пробелы'
              },
              {
                pattern: new RegExp(/^[А-яA-z]+$/, 'g'),
                message: 'Поле должно содержать символы латинского алфавита или кириллицы'
              },
              {
                min: 2, max: 50, message: 'Поле должно содержать от 2 до 50 символов'
              }
            ]}
          >
            <Input type="text" placeholder="Введите свое имя" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            className={`user-auth__field ${themeCheckboxContext.isDarkTheme ? 'user-auth__field_theme_dark' : ''}`}
            name="lastName"
            hasFeedback
            label={<b>Фамилия:</b>}
            rules={[
              {
                required: true,
                message: 'Необходимо заполнить данное поле'
              },
              {
                whitespace: true,
                message: 'Поле не должно содержать лишние пробелы'
              },
              {
                pattern: new RegExp(/^[А-яA-z]+$/, 'g'),
                message: 'Поле должно содержать символы латинского алфавита или кириллицы'
              },
              {
                min: 2, max: 50, message: 'Поле должно содержать от 2 до 50 символов'
              }
            ]}
          >
            <Input type="text" placeholder="Введите свою фамилию" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            className={`
              user-auth__field user-auth__field_inline
              ${themeCheckboxContext.isDarkTheme ? 'user-auth__field_theme_dark' : ''}
            `}
            name="gender"
            hasFeedback
            label={<b>Пол:</b>}
            rules={[
              {
                required: true,
                message: 'Необходимо заполнить данное поле'
              }
            ]}
          >
            <Radio.Group>
              <Radio value="male">Мужской</Radio>
              <Radio value="female">Женский</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            className={`user-auth__field ${themeCheckboxContext.isDarkTheme ? 'user-auth__field_theme_dark' : ''}`}
            name="dateOfBirth"
            hasFeedback
            label={<b>Дата рождения:</b>}
            rules={[
              {
                required: true,
                message: 'Необходимо заполнить данное поле'
              },
            ]}
          >
            <DatePicker
              style={{ width: '100%' }}
              format="DD.MM.YYYY"
              picker="date"
              placeholder="ДД.ММ.ГГГГ"
              disabledDate={(item) => !item || item.isAfter(MAXIMUM_DATE) || item.isSameOrBefore('1960-01-01')}
              defaultPickerValue={moment(MAXIMUM_DATE)}
            />
          </Form.Item>
          <Form.Item
            className={`user-auth__field ${themeCheckboxContext.isDarkTheme ? 'user-auth__field_theme_dark' : ''}`}
            name="email"
            label={<b>Email:</b>}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Необходимо заполнить данное поле'
              },
              {
                type: 'email',
                message: 'Email введен некорректно'
              }
            ]}
          >
            <Input type="email" placeholder="example@mail.com" />
          </Form.Item>
          <Form.Item
            className={`user-auth__field ${themeCheckboxContext.isDarkTheme ? 'user-auth__field_theme_dark' : ''}`}
            name="phone"
            hasFeedback
            label={<b>Телефон:</b>}
            rules={[
              {
                required: true,
                message: 'Необходимо заполнить данное поле'
              },
              {
                pattern: new RegExp(/^(\+)?[0-9-()]+$/, 'g'),
                message: 'Поле должно содержать цифры или символы -() и + в начале'
              }
            ]}
          >
            <Input type="tel" placeholder="+79991234567" />
          </Form.Item>
          <Form.Item>
            <Button
              loading={isLoading}
              type="primary"
              block
              htmlType="submit"
              className="user-auth__button"
            >
              Зарегистрироваться
            </Button>
            <p
              className={`user-auth__info ${
                themeCheckboxContext.isDarkTheme ? 'user-auth__info_theme_dark' : ''
              }`}
            >
              Уже есть аккаунт?
              {' '}
              <Link to="/login">Войти</Link>
            </p>
            {(error !== undefined && !sendUser.id) && (
              <Alert message="Аккаунт с таким email уже существует" type="error" />
            )}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;
