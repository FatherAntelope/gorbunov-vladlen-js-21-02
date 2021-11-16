import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as UsersACCreators from '../actions/users';

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(UsersACCreators, dispatch);
};
