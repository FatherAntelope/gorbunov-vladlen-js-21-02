import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button, Col, DatePicker, Form, Input, Radio, Row, Select
} from 'antd';
import { useHistory } from 'react-router-dom';
import { IUserCreate } from '../../types/api/dymMyApi';
import { getJSONStringifyFromFormData } from '../../utils/fetchDumMyApi';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';

const RegisterUserForm = () => {
  const historyHook = useHistory();
  const [form] = Form.useForm();
  const selectTitle: string[] = ['mr', 'ms', 'mrs', 'miss', 'dr'];
  const { userData, error } = useTypedSelector((state) => state.registerUser);
  const [transitionToURL, setTransitionToURL] = useState(false as boolean);
  const { registerUserAC } = useActions();
  const handleFinishForm = () => {
    const formData: IUserCreate = form.getFieldsValue();
    const formBody = getJSONStringifyFromFormData(formData);
    registerUserAC(formBody);
    if (error === undefined) {
      setTransitionToURL(true);
    }
  };

  useEffect(() => {
    if (transitionToURL && error === undefined) {
      historyHook.push(`/user/${userData?.id}`);
    }
  }, [userData]);

  return (
    <div className="form-wrapper">
      <Form autoComplete="off" form={form} name="formCreateUser" layout="vertical" onFinish={handleFinishForm}>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              name="userFirstName"
              label="First Name"
              hasFeedback
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
              <Input type="text" name="firstName" placeholder="First Name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="userLastName"
              label="Last Name"
              hasFeedback
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
              <Input type="text" name="lastName" placeholder="Last Name" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={8}>
            <Form.Item
              name="userEmail"
              label="Email"
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
              <Input type="email" name="email" placeholder="Email" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="userPhone"
              label="Phone"
              hasFeedback
              rules={[
                {
                  pattern: new RegExp(/^[0-9]+$/, 'g'),
                  message: 'Поле должно содержать цифры'
                }
              ]}
            >
              <Input type="tel" name="phone" placeholder="Phone number" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="userPicture"
              label="Picture"
              hasFeedback
              rules={[
                {
                  type: 'url',
                  message: 'Некорректная ссылка'
                }
              ]}
            >
              <Input type="text" name="picture" placeholder="Picture(URL)" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={4}>
            <Form.Item name="userTitle" hasFeedback label="Title">
              <Select placeholder="Select title">
                {
                  selectTitle.map((item, index) => (
                    <Select.Option key={index} value={item}>{item.toUpperCase()}</Select.Option>
                  ))
                }
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="userDateOfBirth" hasFeedback label="Date of birth">
              <DatePicker style={{ width: '100%' }} picker="date" name="dateOfBirth" placeholder="Date of birth" />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item name="userGender" hasFeedback label="Gender">
              <Radio.Group name="gender">
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
                <Radio value="other">Other</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={6}>
            <Form.Item
              name="userState"
              hasFeedback
              label="State"
              rules={[
                {
                  whitespace: true,
                  message: 'Поле не должно содержать лишние пробелы'
                },
                {
                  min: 2, max: 30, message: 'Поле должно содержать от 2 до 30 символов'
                }
              ]}
            >
              <Input type="text" name="state" placeholder="State" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="userCountry"
              hasFeedback
              label="Country"
              rules={[
                {
                  whitespace: true,
                  message: 'Поле не должно содержать лишние пробелы'
                },
                {
                  min: 2, max: 30, message: 'Поле должно содержать от 2 до 30 символов'
                }
              ]}
            >
              <Input type="text" name="country" placeholder="Country" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="userCity"
              hasFeedback
              label="City"
              rules={[
                {
                  whitespace: true,
                  message: 'Поле не должно содержать лишние пробелы'
                },
                {
                  min: 2, max: 30, message: 'Поле должно содержать от 2 до 30 символов'
                }
              ]}
            >
              <Input type="text" name="city" placeholder="City" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="userStreet"
              hasFeedback
              label="Street"
              rules={[
                {
                  whitespace: true,
                  message: 'Поле не должно содержать лишние пробелы'
                },
                {
                  min: 5, max: 100, message: 'Поле должно содержать от 5 до 100 символов'
                }
              ]}
            >
              <Input type="text" name="street" placeholder="Street" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="userTimezone"
              hasFeedback
              label="Timezone"
              rules={[
                {
                  pattern: new RegExp(/^(\+|-)([0-9]{1,2}):([0-9]{2})$/, 'g'),
                  message: 'Неверный формат временной зоны. Верный: +/-00:00'
                }
              ]}
            >
              <Input type="text" name="timezone" placeholder="Timezone" />
            </Form.Item>
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          Зарегистрировать
        </Button>
        {error && <Alert style={{ marginTop: '15px' }} message={error} type="error" showIcon />}
      </Form>
    </div>
  );
};

export default RegisterUserForm;
