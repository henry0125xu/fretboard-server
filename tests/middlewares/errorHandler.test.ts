import request from "supertest";
import express, { Request, Response, NextFunction } from "express";
import { errorHandler } from "../../src/middlewares/errorHandler";
import { AppError } from "../../src/errors/appError";

const app = express();

app.get("/error", (_req: Request, _res: Response, next: NextFunction) => {
  next(new AppError("This is a custom error", 400));
});

app.get(
  "/generic-error",
  (_req: Request, _res: Response, _next: NextFunction) => {
    throw new Error("This is a generic error");
  }
);

app.use(errorHandler);

describe("errorHandler middleware", () => {
  it("should handle custom AppError and return correct status and message", async () => {
    const response = await request(app).get("/error");

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("This is a custom error");
  });

  it("should handle generic errors and return 500 status", async () => {
    const response = await request(app).get("/generic-error");

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Internal Server Error");
    expect(response.body.error).toBeUndefined();
  });

  it("should expose stack trace in development environment", async () => {
    process.env.NODE_ENV = "development";

    const response = await request(app).get("/generic-error");

    expect(response.status).toBe(500);
    expect(response.body.error).toBeDefined();

    process.env.NODE_ENV = "production";
  });

  it("should log error to console for unknown errors", async () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});

    await request(app).get("/generic-error");

    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining("This is a generic error")
    );

    spy.mockRestore();
  });
});
