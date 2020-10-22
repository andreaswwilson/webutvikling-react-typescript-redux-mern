import {
  FetchMoviesAction,
  DeleteMovieAction,
  ToggleFavoriteMovieAction,
} from './movies';

export enum MoviesActionTypes {
  fetchMovies,
  deleteMovie,
  toggleFavorite,
}

export type MoviesAction =
  | FetchMoviesAction
  | DeleteMovieAction
  | ToggleFavoriteMovieAction;
