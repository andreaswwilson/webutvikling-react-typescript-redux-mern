import axios from 'axios';
import { ActionTypes } from './';
import { Dispatch } from 'redux';

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
}

export interface FetchMoviesAction {
  type: ActionTypes.fetchMovies;
  payload: any;
}

export const fetchMovies = () => {
  const url = 'http://localhost:5000/api/movies';
  return async (dispatch: Dispatch) => {
    const response = await axios.get(url);

    dispatch<FetchMoviesAction>({
      type: ActionTypes.fetchMovies,
      payload: response.data,
    });
  };
};
