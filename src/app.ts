import "./config";
import express from "express";
import routes from "./routes";
import session from "./middlewares/redisSession";
import { errorHandler } from "./middlewares/errorHandler";
import { requestLogger, responseLogger } from "./middlewares/messageLogger";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
// app.use(responseLogger);
app.use(session);
app.use("/api", routes);
app.use(errorHandler);

export default app;
