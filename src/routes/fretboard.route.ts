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

routes.put("/strings/:stringId/open-string", (req, res, next) =>
  controller.updateOpenString(req, res, next)
);

routes.put("/num-frets", (req, res, next) =>
  controller.updateNumFrets(req, res, next)
);

routes.post("/press-notes", (req, res, next) =>
  controller.pressNotes(req, res, next)
);

export default routes;
