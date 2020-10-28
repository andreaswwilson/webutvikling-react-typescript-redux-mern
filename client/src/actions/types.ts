import {
  FetchMoviesAction,
  DeleteMovieAction,
  ToggleFavoriteMovieAction,
  SearchMoviesAction,
  UpdateMovieAction,
  SortByYearMovieAction,
  FilterByCategoryAction,
} from './movies';

import { SetPageAction, NextPageAction, PrevPageAction } from './pages';

export enum MoviesActionTypes {
  fetchMovies = 'FETCH_MOVIES',
  deleteMovie = 'DELETE_MOVIE',
  toggleFavorite = 'TOGGLE_FAVORITE',
  updateMovie = 'UPDATE_MOVIE',
  sortByYear = 'SORT_BY_YEAR',
  searchMovies = 'SEARCH_MOVIES',
  filterByCategory = 'FILTER_BY_CATEGORY',
}

export type MoviesAction =
  | FetchMoviesAction
  | DeleteMovieAction
  | ToggleFavoriteMovieAction
  | UpdateMovieAction
  | SortByYearMovieAction
  | SearchMoviesAction
  | UpdateMovieAction
  | FilterByCategoryAction;

export enum PageActionTypes {
  setPage = 'SET_PAGE',
  nextPage = 'NEXT_PAGE',
  prevPage = 'PREV_PAGE',
}

export type PageAction = SetPageAction | NextPageAction | PrevPageAction;
