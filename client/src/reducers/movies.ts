import { Movie, MoviesAction, MoviesActionTypes } from '../actions';


// Movies reducer that manipulate an array of movie-objects
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
        // Sett favoritt til å være motsatt. Derson den ikke allerede er satt
        // er den undefined, og blir da satt til sann.
        movie.Favorite = !movie.Favorite;
        return {
          ...movie,
        };
      });
    
    case MoviesActionTypes.searchMovies: 
      return action.payload

    case MoviesActionTypes.updateMovie:
      return state;

    default:
      return state;
  }
};
