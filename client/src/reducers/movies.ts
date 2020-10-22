import { Movie, MoviesAction, MoviesActionTypes } from '../actions';

// Movies reducer that manipulate an array ov movie-objects
export const moviesReducer = (state: Movie[] = [], action: MoviesAction) => {
  switch (action.type) {
    // If we are fetching all movies just return all
    case MoviesActionTypes.fetchMovies:
      return action.payload;
    case MoviesActionTypes.deleteMovie:
      return state.filter((movie: Movie) => movie._id !== action.payload);
    case MoviesActionTypes.toggleFavorite:
      return state.map((movie: Movie) => {
        if (movie._id !== action.payload) {
          // Ikke denne vi ser etter
          return movie;
        }
        // Sett favoritt til å være sann
        movie.Favorite = !movie.Favorite;
        return {
          ...movie,
        };
      });

    default:
      return state;
  }
};
