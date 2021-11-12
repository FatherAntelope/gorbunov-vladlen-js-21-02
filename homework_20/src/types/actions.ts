import { IListResponse, IUser, IUserFull } from './api/dymMyApi';

export interface IAction {
  type: string;
}

export interface ILoadUsersAction extends IAction {
  payload: IListResponse<IUser>;
}

export interface ILoadUserAction extends IAction {
  payload: IUserFull;
}
