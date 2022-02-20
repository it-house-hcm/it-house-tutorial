import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

const mongoUri = config.get<string>("mongo.uri");
const connection = mongoose.createConnection(mongoUri);

connection.on("connected", () => {
  logger.info("Mongoose connected");
});

export const Mongo = connection;
