import "./configs/misc";
import express from "express";
import routes from "./routes";
import session from "./configs/session";
import cors from "cors";
import { redisStore } from "./services/redis.service";
import { errorHandler } from "./middlewares/errorHandler";
import { requestLogger, responseLogger } from "./middlewares/messageLogger";
import { swaggerSpec, swaggerUi } from "./configs/swagger";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(requestLogger);
// app.use(responseLogger);
app.use(session(redisStore));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", routes);
app.use(errorHandler);

export default app;
