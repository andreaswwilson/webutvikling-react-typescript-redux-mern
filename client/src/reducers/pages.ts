import { Page, PageAction, SET_PAGE, NEXT_PAGE, PREV_PAGE } from '../actions';

export const pagesReducer = (state: Page = { page: 1 }, action: PageAction) => {
  switch (action.type) {
    case SET_PAGE:
      var newState: Page = {
        page: action.payload,
      };
      return newState;
    case NEXT_PAGE:
      var newPage: Page = {
        page: state.page + 1,
      };
      return newPage;
    case PREV_PAGE:
      var newPage: Page = {
        page: Math.max(state.page - 1, 1),
      };
      return newPage;
    default:
      return state;
  }
};
