import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/envConstants";

export const generateRandomPayload = () => {
  return {
    userId: Math.random().toString(36).substring(2),
  };
};

export const generateToken = (userId: string) => {
  const payload = { userId };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};
