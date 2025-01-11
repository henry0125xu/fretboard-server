import express from "express";
import fretboard from "./fretboard.routes";

const router = express.Router();

router.use("/fretboard", fretboard);

export default router;
