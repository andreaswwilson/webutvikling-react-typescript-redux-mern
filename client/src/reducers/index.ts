import { combineReducers } from 'redux';
import { Movie } from '../actions';
import { moviesReducer } from './movies';

export interface StoreState {
  movies: Movie[];
}

export const reducers = combineReducers<StoreState>({
  movies: moviesReducer,
});
