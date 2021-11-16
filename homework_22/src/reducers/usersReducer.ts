import { IUsersState, UsersAC, UsersACTypes } from '../types/redux/users';

const initialState: IUsersState = {
  users: { data: [], total: 0 },
  isLoading: false
};

const usersReducer = (state = initialState, action: UsersAC): IUsersState => {
  switch (action.type) {
    case UsersACTypes.LOAD_USERS:
      return { isLoading: true, users: { data: [], total: 0 } };
    case UsersACTypes.LOAD_USERS_SUCCESS:
      return { isLoading: false, users: action.payload };
    default:
      return state;
  }
};

export default usersReducer;
