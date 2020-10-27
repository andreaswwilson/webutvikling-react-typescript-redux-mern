import axios from 'axios';
import { MoviesActionTypes } from './';
import { Dispatch } from 'redux';

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
  const page = 1;
  const url = 'http://localhost:5000/api/movies/page/' + page;
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

export interface UpdateMovieAction {
  type: MoviesActionTypes.updateMovie;
  payload: JSON;
}

export const updateMovie = (movie: Movie) => {
  const url = 'http://localhost:5000/api/movies/id/' + movie._id;
  console.log('URL:' + url);
  return async (dispatch: Dispatch) => {
    const response = await axios.put(url, movie);

    dispatch<UpdateMovieAction>({
      type: MoviesActionTypes.updateMovie,
      payload: response.data,
    });
  };
};
