import { Page, PageAction, PageActionTypes } from '../actions';

export const pagesReducer = (state: Page = { page: 1 }, action: PageAction) => {
  switch (action.type) {
    case PageActionTypes.setPage:
      var newState: Page = {
        page: action.payload,
      };
      return newState;
    case PageActionTypes.nextPage:
      var newPage: Page = {
        page: state.page + 1,
      };
      return newPage;
    case PageActionTypes.prevPage:
      var newPage: Page = {
        page: Math.max(state.page - 1),
      };
      return newPage;
    default:
      return state;
  }
};
