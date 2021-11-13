import { EventEmitter } from 'events';
import { IUserFull } from '../types/api/dymMyApi';
import { ILoadUserAction, IRegisterUserAction } from '../types/actions';
import {
  DEFAULT_FUNCTION, LOAD_USER, LOAD_USER_SUCCESS, REGISTER_USER
} from '../constants/actions';
import dispatcher from '../dispatcher';
import { IUserState } from '../types/state';

class UserStore extends EventEmitter {
  private stateUser;

  private stateUserCreateID;

  constructor() {
    super();
    this.stateUser = {} as IUserState;
    this.stateUserCreateID = '' as string;
    this.getStateUser = this.getStateUser.bind(this);
    this.getStateUserCreateID = this.getStateUserCreateID.bind(this);
  }

  public readonly getStateUser = (): IUserState => this.stateUser;

  public readonly getStateUserCreateID = (): string => this.stateUserCreateID;

  private readonly loadUserSuccess = (user: IUserFull): void => {
    this.stateUser = {
      userData: user,
      isLoading: false
    };
    this.emit('load');
  };

  public handleActionLoad(action: ILoadUserAction): void {
    switch (action.type) {
      case LOAD_USER:
        this.stateUser = { ...this.stateUser, isLoading: true };
        this.emit('load');
        break;
      case LOAD_USER_SUCCESS:
        this.loadUserSuccess(action.payload);
        break;
      case REGISTER_USER:
      default: DEFAULT_FUNCTION();
    }
  }

  public handleActionSubmit(action: IRegisterUserAction) {
    switch (action.type) {
      case REGISTER_USER:
        this.stateUserCreateID = action.payload;
        this.emit('submit');
        break;
      default: DEFAULT_FUNCTION();
    }
  }
}

const userStore = new UserStore();
dispatcher.register(userStore.handleActionLoad.bind(userStore));
dispatcher.register(userStore.handleActionSubmit.bind(userStore));

export default userStore;
