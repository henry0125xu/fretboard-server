import express from "express";
import routes from "./routes";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler";
import { requestLogger, responseLogger } from "./middlewares/messageLogger";

process.on("unhandledRejection", (reason, _promise) => {
  console.error("Unhandled Rejection:", reason);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(responseLogger);
app.use("/api", routes);
app.use(errorHandler);

export default app;
