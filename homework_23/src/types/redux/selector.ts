export interface ISelectorState {
  currentLimit: number
}

export enum ISelectorACTypes {
  SELECT_LIMIT = 'SELECTOR/SELECT_LIMIT'
}

interface ISelectLimitAC {
  type: ISelectorACTypes.SELECT_LIMIT,
  payload: number
}

export type SelectorAC = ISelectLimitAC;
