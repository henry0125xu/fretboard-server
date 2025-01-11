import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/envConstants";

declare module "express-serve-static-core" {
  interface Request {
    userId: string;
  }
}

const authenticateJwt: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res
      .status(401)
      .json({ message: "Authorization header is missing or invalid" });
  }

  const token = (authHeader as string).split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    req.userId = decoded.userId;
    console.log("User ID:", req.userId);
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

export default authenticateJwt;
