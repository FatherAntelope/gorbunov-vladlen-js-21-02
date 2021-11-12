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

export interface IRegisterUserAction extends IAction {
  payload: string;
}

export interface ISelectPage extends IAction {
  payload: number;
}

export interface ISetCountPages extends IAction {
  payload: number;
}
