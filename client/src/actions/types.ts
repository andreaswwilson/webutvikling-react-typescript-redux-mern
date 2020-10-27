import {
  FetchMoviesAction,
  DeleteMovieAction,
  ToggleFavoriteMovieAction,
  SearchMoviesAction,
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
  searchMovies = 'SEARCH_MOVIES',
}

export type MoviesAction =
  | FetchMoviesAction
  | DeleteMovieAction
  | ToggleFavoriteMovieAction
  | UpdateMovieAction
  | SortByYearMovieAction
  | SearchMoviesAction
  | UpdateMovieAction;

export enum PageActionTypes {
  setPage = 'SET_PAGE',
  nextPage = 'NEXT_PAGE',
  prevPage = 'PREV_PAGE',
}

export type PageAction = SetPageAction | NextPageAction | PrevPageAction;
