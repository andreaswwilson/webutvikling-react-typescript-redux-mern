import { model, Schema } from "mongoose";

//Schema representing a single movie
const MovieSchema = new Schema({
  title: String,
  plot: String,
  year: String,
  genre: String,
  director: String,
  actors: String,
  imdbRating: String,
  poster: String,
});

const Movie = model("movie", MovieSchema);

export default Movie;
