import {
  FetchMoviesAction,
  DeleteMovieAction,
  ToggleFavoriteMovieAction,
  UpdateMovieAction,
} from './movies';

import {
  SetPageAction,
  NextPageAction,
  PrevPageAction,
} from './pages';

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


export enum PageActionTypes {
  setPage,
  nextPage,
  prevPage,
}

export type PageAction = 
  | SetPageAction
  | NextPageAction
  | PrevPageAction
