import { EventEmitter } from 'events';
import { IUserFull } from '../types/api/dymMyApi';
import { ILoadUserAction } from '../types/actions';
import { DEFAULT_FUNCTION, LOAD_USER, LOAD_USER_SUCCESS } from '../constants/actions';
import dispatcher from '../dispatcher';
import { IUserState } from '../types/state';

class UserStore extends EventEmitter {
  private state;

  constructor() {
    super();
    this.state = {} as IUserState;
    this.getState = this.getState.bind(this);
  }

  getState = () => this.state;

  loadUserSuccess = (user: IUserFull) => {
    this.state = {
      userData: user,
      isLoading: false
    };
    this.emit('load');
  };

  handleAction(action: ILoadUserAction) {
    switch (action.type) {
      case LOAD_USER:
        this.state = { ...this.state, isLoading: true };
        break;
      case LOAD_USER_SUCCESS:
        this.loadUserSuccess(action.payload);
        break;
      default: DEFAULT_FUNCTION();
    }
  }
}

const userStore = new UserStore();
dispatcher.register(userStore.handleAction.bind(userStore));

export default userStore;
