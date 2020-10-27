import { SET_PAGE, NEXT_PAGE, PREV_PAGE } from './';

export interface Page {
  page: number;
}

export interface SetPageAction {
  type: typeof SET_PAGE;
  payload: number;
}

export const setPage = (page: number): SetPageAction => {
  return {
    type: SET_PAGE,
    payload: page,
  };
};

export interface NextPageAction {
  type: typeof NEXT_PAGE;
}
export const nextPage = (): NextPageAction => {
  return {
    type: NEXT_PAGE,
  };
};

export interface PrevPageAction {
  type: typeof PREV_PAGE;
}
export const prevPage = (): PrevPageAction => {
  return {
    type: PREV_PAGE,
  };
};
