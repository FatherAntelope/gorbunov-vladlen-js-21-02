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

export interface ISelectPageAction extends IAction {
  payload: number;
}

export interface ISetCountPagesAction extends IAction {
  payload: number;
}

export interface IToggleThemeAction extends IAction {
  payload: boolean;
}
