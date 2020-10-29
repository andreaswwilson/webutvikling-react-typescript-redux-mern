import axios from 'axios';
import { MoviesActionTypes } from '.';
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

export interface MovieState {
  movies: Movie[];
  isLoading: boolean;
  totalCount: number;
  query: FetchMoviesProps;
}

export interface FetchMoviesAction {
  type: MoviesActionTypes.fetchMovies;
  payload: { totalCount: number; movies: Movie[]; query: FetchMoviesProps };
}

export interface FetchMoviesProps {
  id?: string;
  genre?: string[];
  sort?: string;
  title?: string;
}

export const fetchMovies = (props: FetchMoviesProps) => {
  const { id, genre, sort, title } = props;
  let url = 'http://localhost:5000/api/movies';
  if (typeof id === 'string') {
    url += ('/' + id) as string;
  } else {
    url += '?';
  }
  console.log(genre);
  if (genre) {
    genre.forEach((g) => {
      url += '&genre[]=' + g;
    });
  }
  if (sort) {
    url += '&sort=' + sort;
  }
  if (title) {
    url += '&title=' + title;
  }
  console.log('FetchMovies url:', url);

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

export interface SortByYearMovieAction {
  type: MoviesActionTypes.sortByYear;
  payload: boolean;
}

export const sortByYear = (reversed: boolean): SortByYearMovieAction => {
  return {
    type: MoviesActionTypes.sortByYear,
    payload: reversed,
  };
};

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
