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
  fetchUsersAll, IListResponse, IUser, IUserFull
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

  const getJSONStringifyFromFormData = (formData: FormData): string => JSON.stringify({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    phone: formData.get('phone') || undefined,
    picture: formData.get('picture') || undefined,
    title: formData.get('userTitle') || undefined,
    gender: formData.get('gender') || undefined,
    dateOfBirth: formData.get('dateOfBirth') || undefined,
    registerDate: new Date(),
    location: (
      formData.has('street')
        || formData.has('city')
        || formData.has('state')
        || formData.has('country')
        || formData.has('timezone')
    ) ? (
        {
          street: formData.get('street') || undefined,
          city: formData.get('city') || undefined,
          state: formData.get('state') || undefined,
          country: formData.get('country') || undefined,
          timezone: formData.get('timezone') || undefined
        }
      ) : undefined
  });

  const renderFormRegistration = () => {
    const selectTitle: string[] = ['mr', 'ms', 'mrs', 'miss', 'dr'];
    const rules = [{ required: true, message: 'Данное поле обязательно для ввода!' }];

    const handleSendForm = (e: React.BaseSyntheticEvent) => {
      const formData = new FormData(e.target);
      if (formData.has('firstName') && formData.has('lastName') && formData.has('email')) {
        const formBody = getJSONStringifyFromFormData(formData);
        fetchCreateUser(
          formBody,
          (response: IUserFull) => {
            // global.location.hash = `#/user/${response.id}`;
            console.log(response);
          },
          () => { throw new Error('Ошибка загрузки данных из сервера'); }
        );
      }
    };

    return (
      <div className="form-wrapper">
        <Form name="formCreateUser" layout="vertical" onSubmitCapture={handleSendForm}>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item name="userFirstName" label="First Name" rules={rules}>
                <Input type="text" name="firstName" placeholder="First Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="userLastName" label="Last Name" rules={rules}>
                <Input type="text" name="lastName" placeholder="Last Name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={8}>
              <Form.Item name="userEmail" label="Email" rules={rules}>
                <Input type="email" name="email" placeholder="Email" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="userPhone" label="Phone">
                <Input type="tel" name="phone" placeholder="Phone number" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="userPicture" label="Picture">
                <Input type="text" name="picture" placeholder="Picture(URL)" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={4}>
              <Form.Item name="userTitle" label="Title">
                <Select placeholder="Select title">
                  {
                    selectTitle.map((item, index) => (
                      <Option key={index} value={item}>{item.toUpperCase()}</Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="userDateOfBirth" label="Date of birth">
                <DatePicker name="dateOfBirth" />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="userGender" label="Gender">
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
              <Form.Item name="userState" label="State">
                <Input type="text" name="state" placeholder="State" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="userCountry" label="Country">
                <Input type="text" name="country" placeholder="Country" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="userCity" label="City">
                <Input type="text" name="city" placeholder="City" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="userStreet" label="Street">
                <Input type="text" name="street" placeholder="Street" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="userTimezone" label="Timezone">
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
            <MyMenu />
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
