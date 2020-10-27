import axios from 'axios';
import { MoviesActionTypes } from '.';
import { Dispatch } from 'redux';
//import { SEARCH_MOVIE } from './types';
import { useDispatch } from 'react-redux';
import { resolve } from 'path';

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

export interface SearchMoviesAction {
  type: MoviesActionTypes.searchMovies;
  payload: Movie[];
}

//dispatching the action type and payload which will make the reducer recognize the actions
export const SearchMovie = (title: string) => {
  
  const url = 'http://localhost:5000/api/movies/title/' + title;
  console.log(url)

  return async(dispatch: Dispatch) => {

    const response = await axios.get(url);

    dispatch <SearchMoviesAction> ({
      type: MoviesActionTypes.searchMovies,
      payload: response.data
    })
  }
}

