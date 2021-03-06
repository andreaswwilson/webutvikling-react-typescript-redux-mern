// https://know-thy-code.com/mongoose-schemas-models-typescript/

import mongoose from 'mongoose';

// Movie interaface
export interface IMovie extends mongoose.Document {
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
  Ratings: Object[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
}
export interface MovieModel extends mongoose.Model<IMovie> {}

export class Movie {
  private _model: mongoose.Model<IMovie>;

  // Create schema
  constructor() {
    const schema = new mongoose.Schema<IMovie>({
      Title: String,
      Year: String,
      Rated: String,
      Released: String,
      Genre: String,
      Director: String,
      Writer: String,
      Actors: String,
      Plot: String,
      Language: String,
      Country: String,
      Awards: String,
      Poster: String,
      Ratings: Array,
      Metascore: String,
      imdbRating: String,
      imdbVotes: String,
      imdbID: String,
      Type: String,
      DVD: String,
      BoxOffice: String,
      Production: String,
      Website: String,
      Favorite: Boolean,
      Runtime: String,
      Reviews: Array,
    });
    // Create model
    this._model = mongoose.model<IMovie>('movies', schema);
  }

  // Return model
  public get model(): mongoose.Model<IMovie> {
    return this._model;
  }
}
