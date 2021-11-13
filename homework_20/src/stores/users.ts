import { EventEmitter } from 'events';
import { DEFAULT_FUNCTION, LOAD_USERS, LOAD_USERS_SUCCESS } from '../constants/actions';
import dispatcher from '../dispatcher';
import { IListResponse, IUser } from '../types/api/dymMyApi';
import { ILoadUsersAction } from '../types/actions';
import { IUsersState } from '../types/state';

class UsersStore extends EventEmitter {
  private state;

  constructor() {
    super();
    this.state = {} as IUsersState;
    this.getState = this.getState.bind(this);
    this.loadUsersSuccess = this.loadUsersSuccess.bind(this);
  }

  public readonly getState = (): IUsersState => this.state;

  private readonly loadUsersSuccess = (users: IListResponse<IUser>): void => {
    this.state = {
      usersList: users.data,
      usersTotal: users.total,
      isLoading: false
    };
    this.emit('change');
  };

  public handleAction(action: ILoadUsersAction): void {
    switch (action.type) {
      case LOAD_USERS:
        this.state = { ...this.state, isLoading: true };
        this.emit('change');
        break;
      case LOAD_USERS_SUCCESS:
        this.loadUsersSuccess(action.payload);
        break;
      default: DEFAULT_FUNCTION();
    }
  }
}

const usersStore = new UsersStore();
dispatcher.register(usersStore.handleAction.bind(usersStore));

export default usersStore;
