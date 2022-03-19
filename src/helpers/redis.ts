import config from "config";
import { createClient } from "redis";
import logger from "./logger";

const redis = createClient({
  url: config.get("redis.url"),
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
