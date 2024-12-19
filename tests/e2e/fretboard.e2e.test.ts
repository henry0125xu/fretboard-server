import request from "supertest";
import app from "../../src/app";

describe("GET /api/fretboard/default", () => {
  it("should return default fretboard data", async () => {
    const response = await request(app).get("/api/fretboard/default");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("fretboard");
  });
});
