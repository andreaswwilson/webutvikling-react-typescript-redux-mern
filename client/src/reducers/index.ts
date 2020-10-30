import { combineReducers } from 'redux';
import { MovieState } from '../actions';
import { moviesReducer } from './movies';

export interface StoreState {
  movieState: MovieState;
}

export const reducers = combineReducers<StoreState>({
  movieState: moviesReducer,
});
