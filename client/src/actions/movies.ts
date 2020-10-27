import axios from 'axios';
import { MoviesActionTypes } from '.';
import { Dispatch } from 'redux';
//import { SEARCH_MOVIE } from './types';
import { useDispatch } from 'react-redux';
import { resolve } from 'path';

export interface Movie {
  _id: string;
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: object[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Favorite?: boolean;
  Runtime: string;
  Reviews?: string[];
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

  return async(dispatch: Dispatch) => {
    const response = await axios.get(url);

    dispatch <SearchMoviesAction> ({
      type: MoviesActionTypes.searchMovies,
      payload: response.data
    })
  }
}

export interface UpdateMovieAction {
  type: MoviesActionTypes.updateMovie;
  payload: any;
}

export const updateMovie = (movie: Movie) => {
  const url = 'http://localhost:5000/api/movies/' + movie._id;
  console.log('URL:' + url);
  return async (dispatch: Dispatch) => {
    const response = await axios.put(url, movie);

    dispatch<UpdateMovieAction>({
      type: MoviesActionTypes.updateMovie,
      payload: response.data,
    });
  };
};
