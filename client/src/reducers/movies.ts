import { Movie, MoviesAction, MoviesActionTypes, MovieState } from '../actions';

const intialState: MovieState = {
  movies: [],
  isLoading: true,
};

// Movies reducer that manipulate an array of movie-objects
export const moviesReducer = (
  state: MovieState = intialState,
  action: MoviesAction,
) => {
  switch (action.type) {
    // If we are fetching all movies just return all
    case MoviesActionTypes.fetchMovies:
      return { isLoading: false, movies: action.payload };
    case MoviesActionTypes.deleteMovie:
      return {
        ...state,
        movies: state.movies.filter(
          (movie: Movie) => movie._id !== action.payload,
        ),
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

    case MoviesActionTypes.searchMovies:
      return { ...state, movie: action.payload };

    case MoviesActionTypes.filterByCategory:
      var newState = state.movies.slice();
      console.log(newState, action.payload);
      action.payload.forEach((genre: string) => {
        newState = newState.filter((movie: Movie) =>
          movie.Genre.includes(genre),
        );
      });
      return {
        ...state,
        movies: newState,
      };

    case MoviesActionTypes.updateMovie:
      return state;

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
