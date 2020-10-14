import mongoose from "mongoose";

let database: mongoose.Connection;

export const connect = () => {
  const uri =
    "mongodb+srv://andreas:andreas@cluster0.dweye.mongodb.net/moviesdb?retryWrites=true&w=majority";
  if (database) {
    return;
  }
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  database = mongoose.connection;
  database.once("open", async () => {
    console.log("Connected to database");
  });
  database.on("error", () => {
    console.log("Error connecting to database");
  });
};

export const disconnect = () => {
  if (!database) {
    return;
  }
  mongoose.disconnect();
};
