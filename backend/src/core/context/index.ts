import { Logger } from "winston";
import { redisConnection } from "../singletons/redis";
import type { Redis } from "ioredis";
import DB from "../databases";
import { logger } from "../utils/logger";

export interface Context {
  db: typeof DB;
  logger: Logger;
  redis: Redis;
}

export const makeContext = () => {
  return {
    db: DB,
    logger,
    redis: redisConnection,
  };
};
