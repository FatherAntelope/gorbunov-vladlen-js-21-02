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
import Tooltip from '../tooltip/Tooltip';
import Card from '../card/Card';
import CardUser from '../card-user/CardUser';
import Pagenator from '../pagenator/Pagenator';
import Selector from '../selector/Selector';
import ThemeCheckbox from '../theme-checkbox/ThemeCheckbox';
import Spinner from '../spinner/Spinner';

import { getJSONStringifyFromFormData } from '../../utils/fetchDumMyApi';
import { IUser, IUserCreate } from '../../types/api/dymMyApi';
import { IUsersState } from '../../types/state';
import usersStore from '../../stores/users';
import userStore from '../../stores/user';
import pagenatorStore from '../../stores/pagenator';
import { loadUsersAC } from '../../actions/users';
import { registerUserAC } from '../../actions/user';
import { selectPageAC, setCountPagesAC } from '../../actions/pagenator';

const { Option } = Select;

const App = () => {
  const locationHook = useLocation();
  const locationHistoryHook = useHistory();
  const [users, setUsers] = useState([] as Array<IUser>);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true as boolean);
  const [countUsers, setCountUsers] = useState(0 as number);
  const [limit, setLimit] = useState(10 as number);
  const [page, setPage] = useState(0 as number);
  const [countPages, setCountPages] = useState(0 as number);
  const [form] = Form.useForm();
  const themeDarkContext = useContext(ThemeDarkContext);

  const loadUsersFLUX = (newPage: number, newLimit: number): void => {
    usersStore.on('change', () => {
      const store: IUsersState = usersStore.getState();
      setCountUsers(store.usersTotal);
      setUsers(store.usersList);
      setIsLoadingUsers(store.isLoading);
    });
    loadUsersAC(newPage, newLimit);
  };

  const selectPageFLUX = (newSelectPage: number): void => {
    pagenatorStore.on('change', () => setPage(pagenatorStore.getStateSelectPage()));
    selectPageAC(newSelectPage);
  };

  const setCountPagesFLUX = (newCountPages: number): void => {
    pagenatorStore.on('change', () => setCountPages(pagenatorStore.getStateCountPages()));
    setCountPagesAC(newCountPages);
  };

  const renderCards = () => {
    useEffect(() => {
      loadUsersFLUX(page, limit);
    }, []);
    return (
      !isLoadingUsers
        ? (
          <div className="row">
            {users.map((item: IUser) => (
              <div className="col-6" key={item.id}>
                <Tooltip themeDark={themeDarkContext.themeDark} textInfo={item.id}>
                  <Link to={`/user/${item.id}`}>
                    <Card
                      themeDark={themeDarkContext.themeDark}
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
        : <Spinner themeDark={themeDarkContext.themeDark} />
    );
  };

  const renderPagenatorAndThemeCheck = () => {
    useEffect(() => {
      // Вызвал таймаут, поскольку, как я понял, здесь конфликтует dispatch, когда одновременно вызывается loadUsersFLUX
      setTimeout(() => setCountPagesFLUX(countUsers / limit));
    }, [countUsers]);

    const selectPage = (currentPage: number): void => {
      selectPageFLUX(currentPage);
      loadUsersFLUX(currentPage, limit);
    };

    const selectLimit = (currentLimit: number, currentCountPages: number): void => {
      setLimit(currentLimit);
      selectPageFLUX(0);
      setCountPagesFLUX(currentCountPages);
      loadUsersFLUX(0, currentLimit);
    };

    return (
      <div className="row row_space-between">
        {
          countPages !== 0 && (
            <Pagenator
              themeDark={themeDarkContext.themeDark}
              page={page}
              selectPage={selectPage}
              countPages={countPages}
            />
          )
        }
        <Selector
          limit={limit}
          countUsers={countUsers}
          selectLimit={selectLimit}
          selectorValues={[5, 10, 20, 30, 40, 50]}
        />
        <ThemeCheckbox themeDark={themeDarkContext.themeDark} toggleTheme={themeDarkContext.toggleTheme} />
      </div>
    );
  };

  const renderFormRegistration = () => {
    const selectTitle: string[] = ['mr', 'ms', 'mrs', 'miss', 'dr'];
    const handleFinishForm = () => {
      const formData: IUserCreate = form.getFieldsValue();
      const formBody = getJSONStringifyFromFormData(formData);
      userStore.on('submit', () => {
        const store: string = userStore.getStateUserCreateID();
        locationHistoryHook.push(`/user/${store}`);
      });
      registerUserAC(formBody);
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
        theme={themeDarkContext.themeDark ? 'dark' : 'light'}
      >
        {itemsMenu.map((item) => (
          <Menu.Item key={item.path}>{item.label}</Menu.Item>
        ))}
      </Menu>
    );
  };

  return (
    <div className="App">
      <Wrapper themeDark={themeDarkContext.themeDark}>
        {renderMenu()}
        <Switch>
          <Route exact path="/registration">
            <Main themeDark={themeDarkContext.themeDark} headerTitle="Регистрация пользователя">
              {renderFormRegistration()}
            </Main>
          </Route>
          <Route exact path="/user/:id">
            <Main themeDark={themeDarkContext.themeDark} headerTitle="Пользователь">
              <CardUser themeDark={themeDarkContext.themeDark} />
            </Main>
          </Route>
          <Route exact path="/">
            <Main themeDark={themeDarkContext.themeDark} headerTitle="Пользователи">
              {renderCards()}
              {renderPagenatorAndThemeCheck()}
            </Main>
          </Route>
        </Switch>
      </Wrapper>
    </div>
  );
};

export default App;
