import request from "supertest";
import app from "../../src/app";

describe("GET /api/fretboard", () => {
  it("should return fretboard data", async () => {
    const response = await request(app).get("/api/fretboard");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("fretboard");
  });
});

describe("POST /api/fretboard/reset", () => {
  it("should return fretboard data", async () => {
    const response = await request(app).post("/api/fretboard/reset");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("fretboard");
  });
});

describe("PATCH /api/fretboard/strings/:stringId", () => {
  it("should return fretboard data", async () => {
    const stringId = 3;
    const body = { openString: "D2" };

    const response = await request(app)
      .patch(`/api/fretboard/strings/${stringId}`)
      .send(body);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("fretboard");
  });
});
