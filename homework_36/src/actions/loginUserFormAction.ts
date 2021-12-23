import { Dispatch } from 'redux';
import { AxiosResponse } from 'axios';
import { fetchUserLoginForm } from '../utils/fetchLocalServer';
import { LoginUserFormAC, LoginUserFormACTypes } from '../types/redux/loginUserForm';
import { EMPTY_STRING } from '../constants/common';
import HttpStatuses from '../constants/httpStatuses';

const loginUserFormAC = (id: string) => async (dispatch: Dispatch<LoginUserFormAC>) => {
  dispatch({
    type: LoginUserFormACTypes.LOGIN_USER_FORM
  });

  try {
    const response: AxiosResponse = await fetchUserLoginForm(id);

    if (response === undefined) {
      throw new Error('503 – Service Unavailable');
    }

    if (response.status === HttpStatuses.OK) {
      const loginUser = await response.data;
      dispatch({
        type: LoginUserFormACTypes.LOGIN_USER_FORM_SUCCESS,
        payload: loginUser.data
      });
    } else {
      throw new Error(`${response.status.toString()} – ${response.data.error.message}`);
    }
  } catch (e) {
    dispatch({
      type: LoginUserFormACTypes.LOGIN_USER_FORM_ERROR,
      payload: String(e)
    });
  }
};

const clearLoginUserFormAC = () => (dispatch: Dispatch<LoginUserFormAC>) => {
  dispatch({
    type: LoginUserFormACTypes.LOGIN_USER_FORM_CLEAR,
    payload: {
      id: EMPTY_STRING,
      picture: EMPTY_STRING,
      firstName: EMPTY_STRING
    }
  });
};

const loginUserSetValuesFormAC = (
  id: string, picture: string, firstName: string
) => (dispatch: Dispatch<LoginUserFormAC>) => {
  dispatch({
    type: LoginUserFormACTypes.LOGIN_USER_FORM_CLEAR,
    payload: {
      id,
      picture,
      firstName
    }
  });
};

export { loginUserFormAC, clearLoginUserFormAC, loginUserSetValuesFormAC };
