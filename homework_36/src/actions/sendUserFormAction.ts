import { Dispatch } from 'redux';
import { AxiosResponse } from 'axios';
import { SendUserFormAC, SendUserFormACTypes } from '../types/redux/sendUserForm';
import { fetchRegisterUser, fetchUpdateUser } from '../utils/fetchLocalServer';
import { EMPTY_STRING } from '../constants/common';
import { ICreateUser } from '../types/api/localServer';
import HttpStatuses from '../constants/httpStatuses';

const registerUserFormAction = (body: ICreateUser) => async (dispatch: Dispatch<SendUserFormAC>) => {
  dispatch({
    type: SendUserFormACTypes.SEND_USER_FORM,
  });

  try {
    const response: AxiosResponse = await fetchRegisterUser(body);

    if (response === undefined) {
      throw new Error('503 – Service Unavailable');
    }

    if (response.status === HttpStatuses.OK) {
      const userRegister = await response.data;
      dispatch({
        type: SendUserFormACTypes.SEND_USER_FORM_SUCCESS,
        payload: userRegister.data
      });
    } else {
      throw new Error(`${response.status.toString()} – ${response.data.error.message}`);
    }
  } catch (e) {
    dispatch({
      type: SendUserFormACTypes.SEND_USER_FORM_ERROR,
      payload: String(e)
    });
  }
};

const updateUserFormAction = (id: string, body: object) => async (dispatch: Dispatch<SendUserFormAC>) => {
  dispatch({
    type: SendUserFormACTypes.SEND_USER_FORM,
  });

  try {
    const response: AxiosResponse = await fetchUpdateUser(id, body);
    const userUpdate = await response.data;
    if (response.status === HttpStatuses.OK) {
      dispatch({
        type: SendUserFormACTypes.SEND_USER_FORM_SUCCESS,
        payload: userUpdate.data
      });
    } else {
      throw new Error(`${response.status.toString()} – ${response.data.error.message}`);
    }
  } catch (e) {
    dispatch({
      type: SendUserFormACTypes.SEND_USER_FORM_ERROR,
      payload: String(e)
    });
  }
};

const clearSendDataUserFormAction = () => async (dispatch: Dispatch<SendUserFormAC>) => {
  dispatch({
    type: SendUserFormACTypes.SEND_USER_FORM_CLEAR,
    payload: { id: EMPTY_STRING, picture: EMPTY_STRING, firstName: EMPTY_STRING }
  });
};

export { registerUserFormAction, updateUserFormAction, clearSendDataUserFormAction };
