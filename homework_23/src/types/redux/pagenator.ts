export interface IPagenatorState {
  currentPage: number;
  countPages: number;
}

export enum PagenatorACTypes {
  SELECT_PAGE = 'PAGENATOR/SELECT_PAGE',
  SET_COUNT_PAGES = 'PAGENATOR/SET_COUNT_PAGES'
}

interface ISelectPageAC {
  type: PagenatorACTypes.SELECT_PAGE;
  payload: number;
}

interface ISetCountPages {
  type: PagenatorACTypes.SET_COUNT_PAGES;
  payload: number;
}

export type PagenatorAC = ISelectPageAC | ISetCountPages;
