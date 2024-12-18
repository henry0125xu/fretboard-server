import express from "express";
import fretboard from "./fretboard.route";

const router = express.Router();

router.use("/fretboard", fretboard);

export default router;
