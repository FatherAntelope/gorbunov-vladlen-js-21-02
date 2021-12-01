import { Dispatch } from 'redux';
import { fetchUserFullForm } from '../utils/fetchDumMyApi';
import { LOADING_EMULATION_TIME } from '../constants/common';
import { UserFullFormAC, UserFullFormACTypes } from '../types/redux/userFullForm';

const loadUserFullFormAC = (id: string) => async (dispatch: Dispatch<UserFullFormAC>) => {
  dispatch({
    type: UserFullFormACTypes.LOAD_USER_FULL_FORM
  });

  try {
    const response = await fetchUserFullForm(id);
    const user = await response.json();

    if (response.ok) {
      setTimeout(() => {
        dispatch({
          type: UserFullFormACTypes.LOAD_USER_FULL_FORM_SUCCESS,
          payload: user
        });
      }, LOADING_EMULATION_TIME);
    } else {
      throw new Error(`${response.status.toString()} – ${user.error}`);
    }
  } catch (e) {
    dispatch({
      type: UserFullFormACTypes.LOAD_USER_FULL_FORM_ERROR,
      payload: String(e)
    });
  }
};

export { loadUserFullFormAC };
