import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    // Handle self-defined errors
    res.status(err.statusCode).json({
      message: err.message,
    });
  } else {
    // Handle unknown errors
    console.error(`[Error] ${err.message}`);

    res.status(500).json({
      message: "Internal Server Error",
      error: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
};
