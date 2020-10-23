// import mongoose from "mongoose";

// let database: mongoose.Connection;

// export const connect = () => {
//   // const uri =
//   //   "mongodb+srv://andreas:andreas@cluster0.dweye.mongodb.net/moviesdb?retryWrites=true&w=majority";
//   const uri = "";
//   if (database) {
//     return;
//   }
//   mongoose.connect(uri, {
//     useNewUrlParser: true,
//     useFindAndModify: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     user: "admin",
//     pass: "admin",
//   });

//   database = mongoose.connection;
//   database.once("open", async () => {
//     console.log("Connected to database");
//   });
//   database.on("error", () => {
//     console.log("Error connecting to database");
//   });
// };

// export const disconnect = () => {
//   if (!database) {
//     return;
//   }
//   mongoose.disconnect();
// };
import { connect, connection, Connection } from 'mongoose';
import { Movie, MovieModel } from '../models';

declare interface IModels {
  Movie: MovieModel;
}

export class DB {
  private static instance: DB;

  private _db: Connection;
  private _models: IModels;

  private constructor() {
    connect(
      'mongodb://adminadmin@it2810-32.idi.ntnu.no:27017/Project3?authSource=admin',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
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
