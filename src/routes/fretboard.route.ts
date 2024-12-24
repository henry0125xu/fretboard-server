import { Router } from "express";
import { FretboardController } from "../controllers/fretboard.controller";

const routes = Router();
const controller = new FretboardController();

routes.get("/", (req, res, next) => controller.getFretboard(req, res, next));

routes.post("/reset", (req, res, next) =>
  controller.resetFretboard(req, res, next)
);

routes.patch("/strings/:stringId", (req, res, next) =>
  controller.updateOpenString(req, res, next)
);

routes.patch("/frets", (req, res, next) =>
  controller.updateNumFrets(req, res, next)
);

export default routes;
