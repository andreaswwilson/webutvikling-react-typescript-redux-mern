import {
  FetchMoviesAction,
  DeleteMovieAction,
  ToggleFavoriteMovieAction,
  UpdateMovieAction,
} from './movies';

import { SetPageAction, NextPageAction, PrevPageAction } from './pages';

export enum MoviesActionTypes {
  fetchMovies = 'FETCH_MOVIES',
  deleteMovie = 'DELETE_MOVIE',
  toggleFavorite = 'TOGGLE_FAVORITE',
  updateMovie = 'UPDATE MOVIE',
}

export type MoviesAction =
  | FetchMoviesAction
  | DeleteMovieAction
  | ToggleFavoriteMovieAction
  | UpdateMovieAction;

export enum PageActionTypes {
  setPage = 'SET_PAGE',
  nextPage = 'NEXT_PAGE',
  prevPage = 'PREV_PAGE',
}

export type PageAction = SetPageAction | NextPageAction | PrevPageAction;
