export interface IModalData {
  [key: string]: any;
}

interface IModalFormState {
  modalData?: IModalData;
  isActive: boolean;
}

export interface IModalsFormState {
  [key: string]: IModalFormState;
}

export enum ModalsFormACTypes {
  OPEN_MODALS_FORM = 'MODALS_FORM/OPEN_MODALS_FORM',
  CLOSE_MODALS_FORM = 'MODALS_FORM/CLOSE_MODALS_FORM'
}

interface IOpenModalsFormAC {
  type: ModalsFormACTypes.OPEN_MODALS_FORM;
  payload: IModalsFormState;
}

interface ICloseModalsFormAC {
  type: ModalsFormACTypes.CLOSE_MODALS_FORM;
  payload: IModalsFormState;
}

export type ModalsFormAC = IOpenModalsFormAC | ICloseModalsFormAC;
