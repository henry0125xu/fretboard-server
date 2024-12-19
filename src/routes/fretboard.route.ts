import { Router } from "express";
import { FretboardController } from "../controllers/fretboard.controller";

const routes = Router();
const controller = new FretboardController();

routes.get("/default", (req, res, next) =>
  controller.getDefaultFretboard(req, res, next)
);

export default routes;
