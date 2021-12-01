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
import { COOKIE_LIFETIME, EMPTY_STRING, MAXIMUM_DATE } from '../../../constants/common';
import { ThemeCheckboxContext } from '../../../contexts/theme-checkbox/ThemeCheckboxContext';
import { checkPictureAndGet, getJSONStringifyForEditDataUser } from '../../../utils/common';
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
    const newDataUser = getJSONStringifyForEditDataUser(formEditDataUser.getFieldsValue());
    updateUserFormAction(cookies.user_id, newDataUser);
  };

  const handleClickDeleteImage = () => {
    updateUserFormAction(cookies.user_id, JSON.stringify({ picture: EMPTY_STRING }));
  };

  const beforeUpload = (file: any) => {
    const imgType = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
    const imgSize = file.size / 1024 / 1024 < 2;

    if (!imgType) {
      message.error('Разрешено изображение только в формате JPG/PNG/JPEG');
    }
    if (!imgSize) {
      message.error('Размер изображения не должен превышать 2 МБ');
    }

    return imgType && imgSize;
  };

  useEffect(() => {
    if (sendData.sendUser.id) {
      setCookies('user_id', cookies.user_id, { maxAge: COOKIE_LIFETIME });
      setCookies('user_first_name', sendData.sendUser.firstName, { maxAge: COOKIE_LIFETIME });
      setCookies('user_picture', sendData.sendUser.picture, { maxAge: COOKIE_LIFETIME });
      loadUserFullFormAC(cookies.user_id);
      clearSendDataUserFormAction();
    }
  }, [sendData.sendUser.id]);

  useEffect(() => {
    if (sendImage.editImageURL) {
      updateUserFormAction(cookies.user_id, JSON.stringify({ picture: sendImage.editImageURL }));
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
          beforeUpload={beforeUpload}
          customRequest={(info) => {
            uploadImageEditAC(info.file);
          }}
        >
          <Button loading={sendImage.isLoading} size="small" icon={<UploadOutlined />}>
            Обновить фото
          </Button>
        </Upload>

        {avatar && <Button size="small" onClick={handleClickDeleteImage}>Удалить фото</Button>}
      </div>
      {(sendImage.error !== undefined && !sendImage.editImageURL) && (
        <Alert message={sendImage.error} type="error" />
      )}

      <Form form={formEditDataUser} name="formEditDataUser" layout="vertical" onFinish={handleClickEditDataUser}>
        <Form.Item
          className={`user-auth__field ${themeCheckboxContext.isDarkTheme ? 'user-auth__field_theme_dark' : ''}`}
          name="firstName"
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
          name="phone"
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
            loading={sendData.isLoading}
            type="primary"
            block
            htmlType="submit"
            className="user-auth__button"
          >
            Сохранить
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
