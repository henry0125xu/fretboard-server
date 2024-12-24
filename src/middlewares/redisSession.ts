import session from "express-session";
import redisService from "../services/redis.service";
import { RedisStore } from "connect-redis";

const TTL = 3600;
const redisStore = new RedisStore({
  client: redisService.client,
  ttl: TTL,
});

export default session({
  store: redisStore,
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * TTL,
    secure: false,
  },
});
