import { Router } from "express";
import { FretboardController } from "../controllers/fretboard.controller";

const routes = Router();
const controller = new FretboardController();

routes.get("/default", controller.getDefaultFretboard);

export default routes;
