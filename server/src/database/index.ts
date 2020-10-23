// reference: https://know-thy-code.com/mongoose-schemas-models-typescript/
// Database connection using singleton pattern - see https://www.tutorialspoint.com/design_pattern/singleton_pattern.htm
import { connect, connection, Connection, ConnectionOptions } from 'mongoose';
import { Movie, MovieModel } from '../models';

declare interface IModels {
  Movie: MovieModel;
}

export class DB {
  private static instance: DB;

  private _db: Connection;
  private _models: IModels;

  private connectionOptions: ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: 'admin',
    pass: 'admin',
  };

  private constructor() {
    connect(
      'mongodb://it2810-32.idi.ntnu.no:27017/Project3?authSource=admin',
      this.connectionOptions,
    );
    this._db = connection;
    this._db.on('open', this.connected);
    this._db.on('error', this.error);

    this._models = {
      Movie: new Movie().model,
    };
  }

  public static get Models() {
    if (!DB.instance) {
      DB.instance = new DB();
    }
    return DB.instance._models;
  }

  private connected() {
    console.log('Connected to database');
  }
  private error(error: any) {
    console.log('Error connection to database: ', error);
  }
}
