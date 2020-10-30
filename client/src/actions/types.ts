import {
  FetchMoviesAction,
  DeleteMovieAction,
  ToggleFavoriteMovieAction,
  UpdateMovieAction,
  SortByYearMovieAction,
  UpdateQueryAction,
  FetchSingleMovieAction,
} from './movies';

export enum MoviesActionTypes {
  fetchMovies = 'FETCH_MOVIES',
  fetchSingleMovie = 'FETCH_SINGLE_MOVIE',
  deleteMovie = 'DELETE_MOVIE',
  toggleFavorite = 'TOGGLE_FAVORITE',
  updateMovie = 'UPDATE_MOVIE',
  sortByYear = 'SORT_BY_YEAR',
  updateQuery = 'UPDATE_QUERY',
}

export type MoviesAction =
  | FetchMoviesAction
  | DeleteMovieAction
  | ToggleFavoriteMovieAction
  | UpdateMovieAction
  | SortByYearMovieAction
  | UpdateQueryAction
  | FetchSingleMovieAction;
