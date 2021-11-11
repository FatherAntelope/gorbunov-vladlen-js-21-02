import './App.css';
import React, { useEffect, useState } from 'react';
import {
  HashRouter, Link, Route, Switch
} from 'react-router-dom';
import {
  Button,
  Col,
  DatePicker,
  Form, Input, Radio, Row, Select
} from 'antd';

import Wrapper from '../wrapper/Wrapper';
import Main from '../main/Main';
import Card from '../card/Card';
import Pagenator from '../pagenator/Pagenator';
import ThemeCheckbox from '../theme-checkbox/ThemeCheckbox';
import Tooltip from '../tooltip/Tooltip';
import {
  fetchCreateUser,
  fetchUsersAll, getJSONStringifyFromFormData, IListResponse, IUser, IUserCreate, IUserFull
} from '../../utils/fetchDumMyApi';
import Spinner from '../spinner/Spinner';
import { ThemeDarkContextProvider } from '../../contexts/theme-checkbox/ThemeCheckboxContext';
import Selector from '../selector/Selector';
import CardUser from '../card-user/CardUser';
import MyMenu from '../my-menu/MyMenu';

const { Option } = Select;

const App = () => {
  const [users, setUsers] = useState([] as Array<IUser>);
  const [countUsers, setCountUsers] = useState(0 as number);
  const [limit, setLimit] = useState(10 as number);
  const [page, setPage] = useState(0 as number);
  const [countPages, setCountPages] = useState(0 as number);
  const [currPath, setCurrPath] = useState('#/' as string);
  const [form] = Form.useForm();

  const loadUsersAll = (pageApi: number, limitApi: number) => fetchUsersAll(
    pageApi,
    limitApi,
    (response: IListResponse<IUser>) => {
      setUsers(response.data);
      setCountUsers(response.total);
    },
    () => { throw new Error('Ошибка загрузки данных из сервера'); }
  );

  useEffect(() => {
    loadUsersAll(page, limit);
  }, []);

  useEffect(() => {
    setCountPages(countUsers / limit);
  }, [countUsers]);

  const selectPage = (currentPage: number): void => {
    setUsers([]);
    setPage(currentPage);
    loadUsersAll(currentPage, limit);
  };

  const selectLimit = (currentLimit: number, currentCountPages: number): void => {
    setUsers([]);
    setPage(0);
    loadUsersAll(0, currentLimit);
    setLimit(currentLimit);
    setCountPages(currentCountPages);
  };

  const renderCards = () => (
    users.length !== 0
      ? (
        <div className="row">
          {users.map((item: IUser) => (
            <div className="col-6" key={item.id}>
              <Tooltip textInfo={item.id}>
                <Link to={`/user/${item.id}`}>
                  <Card
                    imgUrl={item.picture}
                    cardUserId={item.id}
                    cardUserTitle={item.title}
                    cardUserFirstName={item.firstName}
                    cardUserLastName={item.lastName}
                  />
                </Link>
              </Tooltip>
            </div>
          ))}
        </div>
      )
      : <Spinner />
  );

  const renderPagenatorAndThemeCheck = () => (
    <div className="row row_space-between">
      {
        countPages !== 0 && (
          <Pagenator page={page} selectPage={selectPage} countPages={countPages} />
        )
      }
      <Selector
        limit={limit}
        countUsers={countUsers}
        selectLimit={selectLimit}
        selectorValues={[5, 10, 20, 30, 40, 50]}
      />
      <ThemeCheckbox />
    </div>
  );

  const renderFormRegistration = () => {
    const selectTitle: string[] = ['mr', 'ms', 'mrs', 'miss', 'dr'];
    const handleSendForm = () => {
      const formData: IUserCreate = form.getFieldsValue();
      const formBody = getJSONStringifyFromFormData(formData);
      fetchCreateUser(
        formBody,
        (response: IUserFull) => {
          global.location.hash = `#/user/${response.id}`;
        },
        () => { throw new Error('Ошибка загрузки данных из сервера'); }
      );
    };

    return (
      <div className="form-wrapper">
        <Form autoComplete="off" form={form} name="formCreateUser" layout="vertical" onFinish={handleSendForm}>
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
                      <Option key={index} value={item}>{item.toUpperCase()}</Option>
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

  return (
    <ThemeDarkContextProvider>
      <div className="App">
        <Wrapper>
          <HashRouter>
            <MyMenu currPath={currPath} setCurrPath={setCurrPath} />
            <Switch>
              <Route exact path="/registration">
                <Main headerTitle="Регистрация пользователя">
                  {renderFormRegistration()}
                </Main>
              </Route>
              <Route exact path="/user/:id">
                <Main headerTitle="Пользователь">
                  <CardUser />
                </Main>
              </Route>
              <Route exact path="/">
                <Main headerTitle="Пользователи">
                  {renderCards()}
                  {renderPagenatorAndThemeCheck()}
                </Main>
              </Route>
            </Switch>
          </HashRouter>
        </Wrapper>
      </div>
    </ThemeDarkContextProvider>
  );
};

export default App;
