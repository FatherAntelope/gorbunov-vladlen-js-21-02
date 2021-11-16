/* eslint-disable */
import './App.css';
import React, { useContext, useEffect, useState } from 'react';
import {
  Link, Route, Switch, useHistory, useLocation
} from 'react-router-dom';

import {
  Button, Col, DatePicker, Form, Input, Menu, Radio, Row, Select
} from 'antd';
import { ThemeDarkContext } from '../../contexts/theme-checkbox/ThemeCheckboxContext';
import Wrapper from '../wrapper/Wrapper';
import Main from '../main/Main';
import CardUser from '../card-user/CardUser';
import Pagenator from '../pagenator/Pagenator';
import Selector from '../selector/Selector';
import ThemeCheckbox from '../theme-checkbox/ThemeCheckbox';

import { getJSONStringifyFromFormData } from '../../utils/fetchDumMyApi';
import { IUser, IUserCreate } from '../../types/api/dymMyApi';
import UsersForm from '../forms/UsersForm';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";

const App = () => {
  const locationHook = useLocation();
  const locationHistoryHook = useHistory();
  const { countPages, currentPage } = useTypedSelector((state) => state.pagenator);
  const { users } = useTypedSelector((state) => state.users);
  const { loadUsersAC, setCountPagesAC } = useActions();
  const { currentLimit } = useTypedSelector((state) => state.selector);
  const [form] = Form.useForm();
  const themeDarkContext = useContext(ThemeDarkContext);

  const renderPagenatorAndThemeCheck = () => {
    useEffect(() => {
      setCountPagesAC(Number(users.total / currentLimit));
    }, [users.total]);

    useEffect(() => {
      loadUsersAC(currentPage, currentLimit);
      setCountPagesAC(Number(users.total / currentLimit));
    }, [currentLimit]);

    return (
      <div className="row row_space-between">
        {
          countPages !== 0 && (
            <Pagenator
              themeDark={themeDarkContext.isDarkTheme}
              page={currentPage}
              countPages={countPages}
            />
          )
        }
        <Selector
          limit={currentLimit}
          selectorValues={[5, 10, 20, 30, 40, 50]}
        />
        <ThemeCheckbox themeDark={themeDarkContext.isDarkTheme} toggleTheme={themeDarkContext.toggleTheme} />
      </div>
    );
  };

  const renderFormRegistration = () => {
    const selectTitle: string[] = ['mr', 'ms', 'mrs', 'miss', 'dr'];
    const handleFinishForm = () => {
      const formData: IUserCreate = form.getFieldsValue();
      const formBody = getJSONStringifyFromFormData(formData);
    };

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
        </Form>
      </div>
    );
  };

  const renderMenu = () => {
    const itemsMenu: Array<any> = [
      { label: 'Пользователи', path: '/' },
      { label: 'Регистрация', path: '/registration' }
    ];
    const [currPath, setCurrPath] = useState(locationHook.pathname);

    useEffect(() => {
      setCurrPath(locationHook.pathname);
    }, [locationHook]);

    const handleClick = (e: any) => {
      locationHistoryHook.push(e.key);
    };

    return (
      <Menu
        selectedKeys={[currPath]}
        onClick={handleClick}
        mode="horizontal"
        theme={themeDarkContext.isDarkTheme ? 'dark' : 'light'}
      >
        {itemsMenu.map((item) => (
          <Menu.Item key={item.path}>{item.label}</Menu.Item>
        ))}
      </Menu>
    );
  };

  return (
    <div className="App">
      <Wrapper themeDark={themeDarkContext.isDarkTheme}>
        {renderMenu()}
        <Switch>
          <Route exact path="/registration">
            <Main themeDark={themeDarkContext.isDarkTheme} headerTitle="Регистрация пользователя">
              {renderFormRegistration()}
            </Main>
          </Route>
          <Route exact path="/user/:id">
            <Main themeDark={themeDarkContext.isDarkTheme} headerTitle="Пользователь">
              <CardUser themeDark={themeDarkContext.isDarkTheme} />
            </Main>
          </Route>
          <Route exact path="/">
            <Main themeDark={themeDarkContext.isDarkTheme} headerTitle="Пользователи">
              <UsersForm selectPage={currentPage} limit={currentLimit} themeDark={themeDarkContext.isDarkTheme} />
              {renderPagenatorAndThemeCheck()}
            </Main>
          </Route>
        </Switch>
      </Wrapper>
    </div>
  );
};

export default App;
