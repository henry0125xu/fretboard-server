import "./config/misc";
import express from "express";
import authRoutes from "./routes/auth/index.routes";
import apiRoutes from "./routes/api/index.routes";
import cors from "cors";
import authenticateJwt from "./middlewares/authenticateJwt";
import { errorHandler } from "./middlewares/errorHandler";
import { requestLogger, responseLogger } from "./middlewares/messageLogger";
import { swaggerSpec, swaggerUi } from "./config/swagger";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(requestLogger);
// app.use(responseLogger);
app.use("/auth", authRoutes);
app.use("/api", authenticateJwt, apiRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(errorHandler);

export default app;
