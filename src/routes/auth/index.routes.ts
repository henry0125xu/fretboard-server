import express from "express";
import jwt from "./jwt.routes";

const router = express.Router();

router.use("/jwt", jwt);

export default router;
