import { combineReducers } from 'redux';
import { Movie, Page } from '../actions';
import { moviesReducer } from './movies';
import { pagesReducer } from './pages';

export interface StoreState {
  movies: Movie[];
  page: Page;
}

export const reducers = combineReducers<StoreState>({
  movies: moviesReducer,
  page: pagesReducer,
});
