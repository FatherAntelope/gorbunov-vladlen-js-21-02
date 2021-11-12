import { IListResponse, IUser } from './api/dymMyApi';

export interface IAction {
  type: string;
}

export interface ILoadUsersAction extends IAction {
  payload: IListResponse<IUser>;
}
