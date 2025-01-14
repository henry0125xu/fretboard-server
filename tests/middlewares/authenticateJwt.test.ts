import request from "supertest";
import express from "express";
import jwt from "jsonwebtoken";
import authenticateJwt from "../../src/middlewares/authenticateJwt";
import { JWT_SECRET } from "../../src/config/keys";

const app = express();
app.use(express.json());

app.get("/protected", authenticateJwt, (req, res) => {
  res.status(200).json({ message: "You have access", userId: req.userId });
});

describe("authenticateJWT Middleware", () => {
  it("should allow access with a valid JWT", async () => {
    const payload = { userId: "test-user-id" };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    const response = await request(app)
      .get("/protected")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("You have access");
    expect(response.body.userId).toBe("test-user-id");
  });

  it("should deny access with an invalid JWT", async () => {
    const token = "invalid-token";

    const response = await request(app)
      .get("/protected")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(403);
    expect(response.body.message).toBe("Invalid or expired token");
  });

  it("should deny access without a JWT", async () => {
    const response = await request(app).get("/protected");

    expect(response.status).toBe(401);
    expect(response.body.message).toBe(
      "Authorization header is missing or invalid"
    );
  });
});
