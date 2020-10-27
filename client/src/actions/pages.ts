import { PageActionTypes } from './';

export interface Page {
  page: number;
}

export interface SetPageAction {
  type: PageActionTypes.setPage;
  payload: number;
}

export const setPage = (page: number): SetPageAction => {
  return {
    type: PageActionTypes.setPage,
    payload: page,
  };
};

export interface NextPageAction {
  type: PageActionTypes.nextPage;
}
export const nextPage = (): NextPageAction => {
  return {
    type: PageActionTypes.nextPage,
  };
};

export interface PrevPageAction {
  type: PageActionTypes.prevPage;
}
export const prevPage = (): PrevPageAction => {
  return {
    type: PageActionTypes.prevPage,
  };
};
