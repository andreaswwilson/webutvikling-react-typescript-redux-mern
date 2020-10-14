import mongoose from "mongoose";

let database: mongoose.Connection;

export const connect = () => {
  // const uri =
  //   "mongodb+srv://andreas:andreas@cluster0.dweye.mongodb.net/moviesdb?retryWrites=true&w=majority";
  const uri = "mongodb://it2810-32.idi.ntnu.no:27017/Project3?authSource=admin";
  if (database) {
    return;
  }
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    user: "admin",
    pass: "admin",
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
