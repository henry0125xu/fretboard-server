import request from "supertest";
import express from "express";
import {
  requestLogger,
  responseLogger,
} from "../../src/middlewares/messageLogger";

const app = express();
app.use(express.json());
app.use(requestLogger);
app.use(responseLogger);

app.get("/test", (_req, res) => {
  res.status(200).send("Hello World");
});

describe("messageLogger middlewares", () => {
  describe("Request Logger Middleware", () => {
    it("should log the request details", async () => {
      const consoleSpy = jest.spyOn(console, "log").mockImplementation();

      await request(app).get("/test").expect(200);

      expect(consoleSpy).toHaveBeenCalledWith("Request received:");
      expect(consoleSpy).toHaveBeenCalledWith("Method:", "GET");
      expect(consoleSpy).toHaveBeenCalledWith("URL:", "/test");

      consoleSpy.mockRestore();
    });
  });

  describe("Response Logger Middleware", () => {
    it("should log the response details", async () => {
      const consoleSpy = jest.spyOn(console, "log").mockImplementation();
      const sendSpy = jest.spyOn(express.response, "send");

      await request(app).get("/test").expect(200);

      expect(consoleSpy).toHaveBeenCalledWith("Response sent:");
      expect(consoleSpy).toHaveBeenCalledWith("Status:", 200);
      expect(consoleSpy).toHaveBeenCalledWith("Body:", "Hello World");

      consoleSpy.mockRestore();
      sendSpy.mockRestore();
    });
  });
});
