import { Movie, MoviesAction, MoviesActionTypes, MovieState } from '../actions';

const intialState: MovieState = {
  movies: [],
  isLoading: true,
  totalCount: 0,
  query: {},
};

// Movies reducer that manipulate an array of movie-objects
export const moviesReducer = (
  state: MovieState = intialState,
  action: MoviesAction,
) => {
  switch (action.type) {
    // If we are fetching all movies just return all
    case MoviesActionTypes.fetchMovies:
      return {
        ...state,
        isLoading: false,
        movies: action.payload.movies,
        totalCount: action.payload.totalCount,
      };

    case MoviesActionTypes.toggleFavorite:
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
      return state;
    case MoviesActionTypes.updateQuery:
      // Using {...state.query} to make a copy since object.assign mutates data which is no-no in redux
      const updatedQuery = Object.assign({ ...state.query }, action.payload);

      // return { ...state, query: action.payload };
      return { ...state, query: updatedQuery };

    case MoviesActionTypes.sortByYear:
      if (action.payload) {
        return {
          ...state,
          movies: state.movies
            .slice()
            .sort((a, b) => (a.Year > b.Year ? 1 : -1)),
        };
      } else {
        return {
          ...state,
          movies: state.movies
            .slice()
            .sort((a, b) => (a.Year > b.Year ? -1 : 1)),
        };
      }

    default:
      return state;
  }
};
