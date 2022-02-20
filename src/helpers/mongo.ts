import mongoose from "mongoose";
import config from "config";

const mongoUri = config.get<string>("mongo.uri");
console.log("mongoUri", mongoUri);
const connection = mongoose.createConnection(mongoUri);

connection.on("connected", () => {
  console.log("Mongoose connected");
});

export const Mongo = connection;
