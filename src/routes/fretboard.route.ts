import { Router } from "express";
import { FretboardController } from "../controllers/fretboard.controller";

const routes = Router();
const controller = new FretboardController();

routes.get("/", (req, res, next) => controller.getFretboard(req, res, next));

routes.post("/reset", (req, res, next) =>
  controller.resetFretboard(req, res, next)
);

routes.post("/strings/:stringId", (req, res, next) =>
  controller.insertString(req, res, next)
);

routes.delete("/strings/:stringId", (req, res, next) =>
  controller.deleteString(req, res, next)
);

routes.patch("/strings/:stringId", (req, res, next) =>
  controller.updateString(req, res, next)
);

routes.patch("/frets", (req, res, next) =>
  controller.updateNumFrets(req, res, next)
);

export default routes;
