import { EventEmitter } from 'events';
import { LOAD_USERS, LOAD_USERS_SUCCESS } from '../constants/actions';
import dispatcher from '../dispatcher';
import { IListResponse, IUser } from '../types/api/dymMyApi';
import { ILoadUsersAction } from '../types/actions';

class UsersStore extends EventEmitter {
  private state;

  constructor() {
    super();
    this.state = {};
    this.getState = this.getState.bind(this);
    this.loadUsersSuccess = this.loadUsersSuccess.bind(this);
  }

  getState = () => this.state;

  loadUsersSuccess = (users: IListResponse<IUser>) => {
    this.state = {
      usersList: users.data,
      usersTotal: users.total,
      isLoading: false
    };
    this.emit('change');
  };

  handleAction(action: ILoadUsersAction) {
    switch (action.type) {
      case LOAD_USERS:
        this.state = { ...this.state, isLoading: true };
        this.emit('change');
        break;
      case LOAD_USERS_SUCCESS:
        this.loadUsersSuccess(action.payload);
        break;
      default: () => {};
    }
  }
}

const usersStore = new UsersStore();
dispatcher.register(usersStore.handleAction.bind(usersStore));

export default usersStore;
