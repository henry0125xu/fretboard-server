import jwt from "jsonwebtoken";
import { Router } from "express";
import { JWT_SECRET } from "../../config/keys";
import { generateRandomPayload } from "../../utils/jwtHelpers";

const routes = Router();

routes.get("/get-token", (_req, res) => {
  const payload = generateRandomPayload();
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

export default routes;
