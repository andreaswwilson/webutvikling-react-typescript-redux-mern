import { combineReducers } from 'redux';
import { MovieState, Page } from '../actions';
import { moviesReducer } from './movies';
import { pagesReducer } from './pages';

export interface StoreState {
  movieState: MovieState;
  page: Page;
}

export const reducers = combineReducers<StoreState>({
  movieState: moviesReducer,
  page: pagesReducer,
});
