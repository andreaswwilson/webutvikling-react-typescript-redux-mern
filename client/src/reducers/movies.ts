import { Movie, Action, ActionTypes } from '../actions';

// Movies reducer that manipulate an array ov movie-objects
export const moviesReducer = (state: Movie[] = [], action: Action) => {
  switch (action.type) {
    // If we are fetching all movies just return all
    case ActionTypes.fetchMovies:
      return action.payload;
    default:
      return state;
  }
};
