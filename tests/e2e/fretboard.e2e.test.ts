import request from "supertest";
import app from "../../src/app";
import { generateToken } from "../../src/utils/jwtHelpers";

describe("Fretboard API", () => {
  let token: string;
  beforeAll(() => {
    token = generateToken("test-user-id");
  });

  describe("GET /api/fretboard", () => {
    it("should return fretboard data", async () => {
      const response = await request(app)
        .get("/api/fretboard")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("fretboard");
    });
  });

  describe("POST /api/fretboard/reset", () => {
    it("should return fretboard data", async () => {
      const response = await request(app)
        .post("/api/fretboard/reset")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("fretboard");
    });
  });

  describe("POST /api/fretboard/strings/:stringId", () => {
    it("should return fretboard data", async () => {
      const stringId = 3;
      const body = { stringId: "2", openString: "D2" };

      const response = await request(app)
        .post(`/api/fretboard/strings/${stringId}`)
        .send(body)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("fretboard");
    });
  });

  describe("DELETE /api/fretboard/strings/:stringId", () => {
    it("should return fretboard data", async () => {
      const stringId = 3;
      const body = { stringId: "2", openString: "D2" };

      const response = await request(app)
        .delete(`/api/fretboard/strings/${stringId}`)
        .send(body)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("fretboard");
    });
  });

  describe("PUT /api/fretboard/strings/:stringId/open-string", () => {
    it("should return fretboard data", async () => {
      const stringId = 3;
      const body = { openString: "D2" };

      const response = await request(app)
        .put(`/api/fretboard/strings/${stringId}/open-string`)
        .send(body)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("fretboard");
    });
  });

  describe("PUT /api/fretboard/num-frets", () => {
    it("should return fretboard data", async () => {
      const body = { numFrets: "15" };

      const response = await request(app)
        .put("/api/fretboard/num-frets")
        .send(body)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("fretboard");
    });
  });

  describe("POST /api/fretboard/press-notes", () => {
    it("should return fretboard data", async () => {
      const body = { notes: ["C", "E", "G"] };

      const response = await request(app)
        .post("/api/fretboard/press-notes")
        .send(body)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("fretboard");
    });
  });
});
