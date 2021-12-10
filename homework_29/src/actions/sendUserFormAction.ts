import { Dispatch } from 'redux';
import { SendUserFormAC, SendUserFormACTypes } from '../types/redux/sendUserForm';
import { fetchRegisterUser, fetchUpdateUser } from '../utils/fetchDumMyApi';
import { EMPTY_STRING } from '../constants/common';

const registerUserFormAction = (body: string) => async (dispatch: Dispatch<SendUserFormAC>) => {
  dispatch({
    type: SendUserFormACTypes.SEND_USER_FORM,
  });

  try {
    const response = await fetchRegisterUser(body);
    const userRegister = await response.json();
    if (response.ok) {
      dispatch({
        type: SendUserFormACTypes.SEND_USER_FORM_SUCCESS,
        payload: userRegister
      });
    } else {
      throw new Error(`${response.status.toString()} – ${userRegister.error}`);
    }
  } catch (e) {
    dispatch({
      type: SendUserFormACTypes.SEND_USER_FORM_ERROR,
      payload: String(e)
    });
  }
};

const updateUserFormAction = (id: string, body: string) => async (dispatch: Dispatch<SendUserFormAC>) => {
  dispatch({
    type: SendUserFormACTypes.SEND_USER_FORM,
  });

  try {
    const response = await fetchUpdateUser(id, body);
    const userUpdate = await response.json();
    if (response.ok) {
      dispatch({
        type: SendUserFormACTypes.SEND_USER_FORM_SUCCESS,
        payload: userUpdate
      });
    } else {
      throw new Error(`${response.status.toString()} – ${userUpdate.error}`);
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
