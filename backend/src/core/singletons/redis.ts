import { isProduction } from "../utils/environment";
import IORedis from "ioredis";
import Redis from "ioredis-mock";

const settings = isProduction()
  ? {
      tls: {
        rejectUnauthorized: false,
      },
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
    }
  : {
      maxRetriesPerRequest: null,
    };

export const redisConnection = new Redis() 
//  !isProduction()
//   ? new Redis()
//   : new IORedis(process.env.REDIS_URL || "127.0.0.1:6379", settings);
