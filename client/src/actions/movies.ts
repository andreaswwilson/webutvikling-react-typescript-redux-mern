import axios from 'axios';
import { MoviesActionTypes } from './';
import { Dispatch } from 'redux';
import { Identifier } from 'typescript';

export interface Movie {
  Title: string;
  Poster: string;
  _id: string;
  Year: string;
  Plot: string;
  imdbRating: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Favorite?: boolean;
}

export interface FetchMoviesAction {
  type: MoviesActionTypes.fetchMovies;
  payload: Movie[];
}

export const fetchMovies = () => {
  const url = 'http://localhost:5000/api/movies';
  return async (dispatch: Dispatch) => {
    const response = await axios.get(url);

    dispatch<FetchMoviesAction>({
      type: MoviesActionTypes.fetchMovies,
      payload: response.data,
    });
  };
};

export interface DeleteMovieAction {
  type: MoviesActionTypes.deleteMovie;
  payload: string;
}

export const deleteMovie = (id: string): DeleteMovieAction => {
  return {
    type: MoviesActionTypes.deleteMovie,
    payload: id,
  };
};

export interface ToggleFavoriteMovieAction {
  type: MoviesActionTypes.toggleFavorite;
  payload: string;
}

export const toggleFavoriteMovie = (id: string): ToggleFavoriteMovieAction => {
  return {
    type: MoviesActionTypes.toggleFavorite,
    payload: id,
  };
};

export interface GetMovieByID {
  type: MoviesActionTypes.getMovieByID;
  payload: string;
}
export const getMovieByID = (id: string): GetMovieByID => {
  return {
    type: MoviesActionTypes.getMovieByID,
    payload: id,
  };
};
