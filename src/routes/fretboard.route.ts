import { Router } from "express";
import { FretboardController } from "../controllers/fretboard.controller";

const routes = Router();
const controller = new FretboardController();

routes.get("/", (_req, res, next) => controller.getFretboard(res, next));

routes.post("/reset", (_req, res, next) =>
  controller.resetFretboard(res, next)
);

routes.patch("/strings/:stringId", (req, res, next) =>
  controller.updateFretboardString(req, res, next)
);

export default routes;
