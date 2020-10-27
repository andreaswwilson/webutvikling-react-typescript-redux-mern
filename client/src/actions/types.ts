import {
  FetchMoviesAction,
  DeleteMovieAction,
  ToggleFavoriteMovieAction,
  SearchMoviesAction
} from './movies';

export enum MoviesActionTypes {
  fetchMovies,
  deleteMovie,
  toggleFavorite,
  searchMovies
}

export type MoviesAction =
  | FetchMoviesAction
  | DeleteMovieAction
  | ToggleFavoriteMovieAction
  | SearchMoviesAction;


//export const SEARCH_MOVIE = 'SEARCH_MOVIE'