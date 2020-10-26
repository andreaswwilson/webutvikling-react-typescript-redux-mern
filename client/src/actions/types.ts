import {
  FetchMoviesAction,
  DeleteMovieAction,
  ToggleFavoriteMovieAction,
  UpdateMovieAction,
} from './movies';

export enum MoviesActionTypes {
  fetchMovies,
  deleteMovie,
  toggleFavorite,
  updateMovie,
}

export type MoviesAction =
  | FetchMoviesAction
  | DeleteMovieAction
  | ToggleFavoriteMovieAction
  | UpdateMovieAction;
