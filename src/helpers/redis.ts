import { createClient } from "redis";
import logger from "./logger";

const redis = createClient({
  url: "redis://localhost:6379",
});

redis
  .connect()
  .then(() => {
    logger.info(`Redis connected`);
  })
  .catch((err) => {
    logger.error(`Redis connection error:`, err);
  });

export default redis;
