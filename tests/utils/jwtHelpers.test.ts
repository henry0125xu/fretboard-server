import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../src/config/keys";
import { generateToken } from "../../src/utils/jwtHelpers";

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn().mockReturnValue("mock-token"),
  verify: jest.fn().mockImplementation((token, secret) => {
    if (token === "mock-token") {
      return {
        userId: "test-user-id",
        exp: Math.floor(Date.now() / 1000) + 3600,
      };
    }
    throw new Error("Invalid token");
  }),
}));

describe("generateToken", () => {
  it("should generate a valid JWT token", () => {
    const userId = "test-user-id";
    const token = generateToken(userId);

    expect(typeof token).toBe("string");

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    expect(decoded.userId).toBe(userId);
  });

  it("should generate a token with a 1h expiration", () => {
    const userId = "test-user-id";
    const token = generateToken(userId);

    const decoded = jwt.verify(token, JWT_SECRET) as { exp: number };

    const currentTime = Math.floor(Date.now() / 1000);
    const tokenExpirationTime = decoded.exp;

    expect(tokenExpirationTime - currentTime).toBeLessThanOrEqual(3600);
  });
});
