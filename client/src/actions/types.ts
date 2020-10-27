import {
  FetchMoviesAction,
  DeleteMovieAction,
  ToggleFavoriteMovieAction,
  SearchMoviesAction,
  UpdateMovieAction,
} from './movies';

import { SetPageAction, NextPageAction, PrevPageAction } from './pages';

export enum MoviesActionTypes {
  fetchMovies,
  deleteMovie,
  toggleFavorite,
  searchMovies,
  updateMovie,
}

export type MoviesAction =
  | FetchMoviesAction
  | DeleteMovieAction
  | ToggleFavoriteMovieAction
  | SearchMoviesAction
//export const SEARCH_MOVIE = 'SEARCH_MOVIE'
  | UpdateMovieAction;

export const SET_PAGE = 'SET_PAGE';
export const NEXT_PAGE = 'NEXT_PAGE';
export const PREV_PAGE = 'PREV_PAGE';

export type PageAction = SetPageAction | NextPageAction | PrevPageAction;
