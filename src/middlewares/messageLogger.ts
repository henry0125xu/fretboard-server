import { Request, Response, NextFunction } from "express";

export const requestLogger = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  console.log("Request received:");
  console.log("Method:", req.method);
  console.log("URL:", req.originalUrl);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  next();
};

export const responseLogger = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const originalSend = res.send;
  res.send = function (body?: any): Response {
    console.log("Response sent:");
    console.log("Status:", res.statusCode);
    console.log("Body:", body);
    return originalSend.call(this, body);
  };

  next();
};
