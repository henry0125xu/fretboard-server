import "./config";
import express from "express";
import routes from "./routes";
import session from "./middlewares/session";
import { redisStore } from "./services/redis.service";
import { errorHandler } from "./middlewares/errorHandler";
import { requestLogger, responseLogger } from "./middlewares/messageLogger";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
// app.use(responseLogger);
app.use(session(redisStore));
app.use("/api", routes);
app.use(errorHandler);

export default app;
