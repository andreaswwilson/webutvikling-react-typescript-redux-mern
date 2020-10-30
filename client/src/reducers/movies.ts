import { Movie, MoviesAction, MoviesActionTypes, MovieState } from '../actions';

const intialState: MovieState = {
  movies: [],
  isLoading: true,
  totalCount: 0,
  query: { limit: 4, page: 1 },
};

// Movies reducer that manipulate an array of movie-objects
export const moviesReducer = (
  state: MovieState = intialState,
  action: MoviesAction,
) => {
  switch (action.type) {
    case MoviesActionTypes.fetchMovies:
      // Fetch all movies with the given query. Return the total movies fount
      // and all the movies returnes by the DB.
      return {
        ...state,
        isLoading: false,
        movies: action.payload.movies,
        totalCount: action.payload.totalCount,
      };

    case MoviesActionTypes.fetchSingleMovie:
      // Fetch all movies with the given query. Return the total movies fount
      // and all the movies returnes by the DB.
      return {
        ...state,
        movie: action.payload.movie,
      };

    case MoviesActionTypes.toggleFavorite:
      // Change the state of a move to be a favorite.
      return {
        ...state,
        movies: state.movies.map((movie: Movie) => {
          if (movie._id !== action.payload) {
            // Ikke denne vi ser etter
            return movie;
          }
          // Sett favoritt til å være motsatt. Derson den ikke allerede er satt
          // er den undefined, og blir da satt til sann.
          movie.Favorite = !movie.Favorite;
          return {
            ...movie,
          };
        }),
      };

    case MoviesActionTypes.updateMovie:
      // This is used to updata a movie in the DB, so the state is not changed.
      return state;

    case MoviesActionTypes.updateQuery:
      // Update the query we are sending to the backend for filtering, searching
      // and sorting

      // Using {...state.query} to make a copy since object.assign mutates data which is no-no in redux
      const updatedQuery = Object.assign({ ...state.query }, action.payload);
      return { ...state, query: updatedQuery };

    default:
      return state;
  }
};
