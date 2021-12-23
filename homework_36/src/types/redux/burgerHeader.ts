export interface IBurgerHeaderState {
  isActive: boolean
}

export enum BurgerHeaderACTypes {
  BURGER_HEADER_SET_ACTIVE = 'BURGER_HEADER/BURGER_HEADER_SET_ACTIVE',
  BURGER_HEADER_SET_NOT_ACTIVE = 'BURGER_HEADER/BURGER_HEADER_SET_NOT_ACTIVE',
}

interface IBurgerSetActiveAC {
  type: BurgerHeaderACTypes.BURGER_HEADER_SET_ACTIVE;
  payload: IBurgerHeaderState;
}

interface IBurgerSetNotActiveAC {
  type: BurgerHeaderACTypes.BURGER_HEADER_SET_NOT_ACTIVE;
  payload: IBurgerHeaderState;
}

export type BurgerHeaderAC = IBurgerSetActiveAC | IBurgerSetNotActiveAC;
