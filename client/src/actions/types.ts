import {
  FetchMoviesAction,
  DeleteMovieAction,
  ToggleFavoriteMovieAction,
  UpdateMovieAction,
  SortByYearMovieAction,
} from './movies';

import { SetPageAction, NextPageAction, PrevPageAction } from './pages';

export enum MoviesActionTypes {
  fetchMovies = 'FETCH_MOVIES',
  deleteMovie = 'DELETE_MOVIE',
  toggleFavorite = 'TOGGLE_FAVORITE',
  updateMovie = 'UPDATE_MOVIE',
  sortByYear = 'SORT_BY_YEAR',
}

export type MoviesAction =
  | FetchMoviesAction
  | DeleteMovieAction
  | ToggleFavoriteMovieAction
  | UpdateMovieAction
  | SortByYearMovieAction;

export enum PageActionTypes {
  setPage = 'SET_PAGE',
  nextPage = 'NEXT_PAGE',
  prevPage = 'PREV_PAGE',
}

export type PageAction = SetPageAction | NextPageAction | PrevPageAction;
