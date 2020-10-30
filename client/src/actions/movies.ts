import axios from 'axios';
import { MoviesActionTypes } from '.';
import { Dispatch } from 'redux';

const BASE_URL = 'http://localhost:3000/api/movies';

// Interace of one movie object
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

// Interface of the state used for managing movie state
export interface MovieState {
  movies: Movie[];
  movie?: Movie;
  isLoading: boolean;
  totalCount: number;
  query: FetchMoviesProps;
}

export interface FetchMoviesAction {
  type: MoviesActionTypes.fetchMovies;
  payload: {
    totalCount: number;
    movies: Movie[];
    query: FetchMoviesProps;
  };
}

export interface FetchMoviesProps {
  id?: string;
  genre?: string[];
  sortYear?: string;
  title?: string;
  limit?: number;
  page?: number;
}

export const fetchMovies = (props: FetchMoviesProps) => {
  // Fetch all movies that mach with the current query
  const { genre, sortYear, title, limit, page } = props;
  let url = BASE_URL + '?';

  // Sice the FetchMoviesProps interface have a lot of optional
  // keys we need to checko what keys are set
  if (genre) {
    genre.forEach((g) => {
      url += '&genre[]=' + g;
    });
  }
  if (sortYear) {
    url += '&sortByYear=' + sortYear;
  }
  if (title) {
    url += '&title=' + title;
  }
  if (limit) {
    url += '&limit=' + limit;
  }
  if (page) {
    url += '&page=' + page;
  }

  // Get the data
  return async (dispatch: Dispatch) => {
    const response = await axios.get(url);

    dispatch<FetchMoviesAction>({
      type: MoviesActionTypes.fetchMovies,
      payload: {
        totalCount: response.data.totalCount,
        movies: response.data.data,
        query: props,
      },
    });
  };
};

// Fetch just a single movie.
export interface FetchSingleMovieAction {
  type: MoviesActionTypes.fetchSingleMovie;
  payload: {
    movie: Movie;
  };
}
export const fetchSingleMovie = (props: FetchMoviesProps) => {
  const { id } = props;
  if (id) {
    const url = BASE_URL + '/' + id;

    return async (dispatch: Dispatch) => {
      const response = await axios.get(url);

      dispatch<FetchSingleMovieAction>({
        type: MoviesActionTypes.fetchSingleMovie,
        payload: {
          movie: response.data.data[0],
        },
      });
    };
  }
};

// Toggle favorite status of a movie
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
  payload: any;
}
// Used for updating a single movie object in the database
// Done by sending the entire movie object as we would like it as a put request
export const updateMovie = (movie: Movie) => {
  const url = BASE_URL + '/' + movie._id;
  return async (dispatch: Dispatch) => {
    const response = await axios.put(url, movie);

    dispatch<UpdateMovieAction>({
      type: MoviesActionTypes.updateMovie,
      payload: response.data,
    });
  };
};

// Set the queries we whould like to add to the DB when fetching movies
export interface UpdateQueryAction {
  type: MoviesActionTypes.updateQuery;
  payload: FetchMoviesProps;
}

export const updateQuery = (props: FetchMoviesProps): UpdateQueryAction => {
  return {
    type: MoviesActionTypes.updateQuery,
    payload: props,
  };
};
