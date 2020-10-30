// File for organizing types
import {
  FetchMoviesAction,
  ToggleFavoriteMovieAction,
  UpdateMovieAction,
  UpdateQueryAction,
  FetchSingleMovieAction,
} from './movies';

export enum MoviesActionTypes {
  fetchMovies = 'FETCH_MOVIES',
  fetchSingleMovie = 'FETCH_SINGLE_MOVIE',
  toggleFavorite = 'TOGGLE_FAVORITE',
  updateMovie = 'UPDATE_MOVIE',
  updateQuery = 'UPDATE_QUERY',
}

export type MoviesAction =
  | FetchMoviesAction
  | ToggleFavoriteMovieAction
  | UpdateMovieAction
  | UpdateQueryAction
  | FetchSingleMovieAction;
