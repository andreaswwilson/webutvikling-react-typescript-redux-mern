import { PageActionTypes } from './';

export interface Page {
    page: number;
}

export const setPage = (page: number) => {
    return {
        type: PageActionTypes.setPage,
        payload: page
    }
}

export const getPage = () => {
    return {
        type: PageActionTypes.setPage,
        payload: 1
    }
}

export const nextPage = (page: number) => {
    return {
        type: PageActionTypes.nextPage,
        payload: page + 1
    }
}

export const prevPage = (page: number) => {
    return {
        type: PageActionTypes.prevPage,
        payload: page - 1
    }
}

export interface SetPageAction {
    type: PageActionTypes.setPage;
    payload: Page;
}

export interface NextPageAction {
    type: PageActionTypes.nextPage;
    payload: Page;
}

export interface PrevPageAction {
    type: PageActionTypes.prevPage;
    payload: Page;
}

