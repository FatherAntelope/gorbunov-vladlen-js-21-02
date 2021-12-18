import { Dispatch } from 'redux';
import { AxiosResponse } from 'axios';
import { fetchUserFullForm } from '../utils/fetchLocalServer';
import { LOADING_EMULATION_TIME } from '../constants/common';
import { UserFullFormAC, UserFullFormACTypes } from '../types/redux/userFullForm';
import HttpStatuses from '../constants/httpStatuses';

const loadUserFullFormAC = (id: string) => async (dispatch: Dispatch<UserFullFormAC>) => {
  dispatch({
    type: UserFullFormACTypes.LOAD_USER_FULL_FORM
  });

  try {
    const response: AxiosResponse = await fetchUserFullForm(id);

    if (response === undefined) {
      throw new Error('503 – Service Unavailable');
    }

    if (response.status === HttpStatuses.OK) {
      const user = await response.data;
      setTimeout(() => {
        dispatch({
          type: UserFullFormACTypes.LOAD_USER_FULL_FORM_SUCCESS,
          payload: user.data
        });
      }, LOADING_EMULATION_TIME);
    } else {
      console.log(response);
      throw new Error(`${response.status.toString()} – ${response.data.error.message}`);
    }
  } catch (e) {
    dispatch({
      type: UserFullFormACTypes.LOAD_USER_FULL_FORM_ERROR,
      payload: String(e)
    });
  }
};

export { loadUserFullFormAC };
