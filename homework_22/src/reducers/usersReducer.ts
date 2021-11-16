import { IUsersState, UsersAC, UsersACTypes } from '../types/redux/users';

const initialState: IUsersState = {
  users: { data: [], total: 0 },
  isLoading: true
};

const usersReducer = (state = initialState, action: UsersAC): IUsersState => {
  switch (action.type) {
    case UsersACTypes.LOAD_USERS:
      return { isLoading: true, users: state.users };
    case UsersACTypes.LOAD_USERS_SUCCESS:
      return { isLoading: false, users: action.payload };
    default:
      return state;
  }
};

export default usersReducer;
