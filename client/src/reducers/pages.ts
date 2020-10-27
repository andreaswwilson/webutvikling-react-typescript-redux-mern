import { Page, PageAction, PageActionTypes } from '../actions';

export const pagesReducer = (state: Page = {page : 1}, action: PageAction) => {
    switch (action.type) {
        case PageActionTypes.setPage:
            return action.payload;
        case PageActionTypes.nextPage:
            return {
                ...state,
                page: action.payload
            }
        case PageActionTypes.prevPage:
            return {
                ...state,
                page: action.payload
            }
        
    }

}