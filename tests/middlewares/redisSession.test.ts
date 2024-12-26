import session from "express-session";
import { RedisStore } from "connect-redis";
import request from "supertest";
import express from "express";

const client = {
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn(),
};

const app = express();

app.use(
  session({
    store: new RedisStore({
      client: client,
      ttl: 3600,
    }),
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 3600,
      secure: false,
    },
  })
);

app.get("/test", (_req, res) => {
  res.status(200).send("Hello World");
});

describe("Session Middleware", () => {
  it("should set session cookie", async () => {
    await request(app)
      .get("/test")
      .expect("Set-Cookie", /connect.sid/);
  });

  it("should store session in Redis", async () => {
    await request(app).get("/test").expect(200);

    expect(client.set).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      "EX",
      3600
    );
  });
});
