import { FretboardService } from "../../src/services/fretboard.service";
import { FretboardController } from "../../src/controllers/fretboard.controller";
import { Fretboard } from "../../src/models/fretboard";
import { NextFunction } from "express";

jest.mock("../../src/services/fretboard.service");

describe("FretboardController class", () => {
  let mockFretboardService: jest.Mocked<FretboardService>;
  let mockFretboard: Fretboard;
  let mockError: Error;
  beforeEach(() => {
    mockFretboardService =
      new FretboardService() as jest.Mocked<FretboardService>;

    mockFretboard = new Fretboard(["E4", "B3", "G3", "D3", "A2", "E2"], 21);
    mockError = new Error("Service error");
  });

  describe("getFretboard method", () => {
    it("should return fretboard on success", async () => {
      mockFretboardService.getFretboard.mockResolvedValue(mockFretboard);

      const controller = new FretboardController(mockFretboardService);
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();

      await controller.getFretboard(res as any, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ fretboard: mockFretboard });
    });

    it("should call next with an error if getFretboard throws", async () => {
      mockFretboardService.getFretboard.mockRejectedValue(mockError);

      const controller = new FretboardController(mockFretboardService);
      const res = { status: jest.fn(), json: jest.fn() };
      const next = jest.fn();

      await controller.getFretboard(res as any, next);

      expect(next).toHaveBeenCalledWith(mockError);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe("resetFretboard method", () => {
    it("should return fretboard on success", async () => {
      mockFretboardService.resetFretboard.mockResolvedValue(mockFretboard);

      const controller = new FretboardController(mockFretboardService);
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();

      await controller.resetFretboard(res as any, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ fretboard: mockFretboard });
    });

    it("should call next with an error if resetFretboard throws", async () => {
      mockFretboardService.resetFretboard.mockRejectedValue(mockError);

      const controller = new FretboardController(mockFretboardService);
      const res = { status: jest.fn(), json: jest.fn() };
      const next = jest.fn();

      await controller.resetFretboard(res as any, next);

      expect(next).toHaveBeenCalledWith(mockError);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe("updateOpenString method", () => {
    it("should return fretboard on success", async () => {
      mockFretboardService.updateOpenString.mockResolvedValue(mockFretboard);

      const controller = new FretboardController(mockFretboardService);
      const req = { params: { stringId: "0" }, body: { openString: "D4" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();

      await controller.updateOpenString(req as any, res as any, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ fretboard: mockFretboard });
    });

    it("should call next with an error if updateOpenString throws", async () => {
      mockFretboardService.updateOpenString.mockRejectedValue(mockError);

      const controller = new FretboardController(mockFretboardService);
      const req = { params: { stringId: "0" }, body: { openString: "D4" } };
      const res = { status: jest.fn(), json: jest.fn() };
      const next = jest.fn();

      await controller.updateOpenString(req as any, res as any, next);

      expect(next).toHaveBeenCalledWith(mockError);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe("updateNumFrets method", () => {
    it("should return fretboard on success", async () => {
      mockFretboardService.updateNumFrets.mockResolvedValue(mockFretboard);

      const controller = new FretboardController(mockFretboardService);
      const req = { body: { numFrets: 15 } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();

      await controller.updateNumFrets(req as any, res as any, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ fretboard: mockFretboard });
    });

    it("should call next with an error if updateNumFrets throws", async () => {
      mockFretboardService.updateNumFrets.mockRejectedValue(mockError);

      const controller = new FretboardController(mockFretboardService);
      const req = { body: { numFrets: 15 } };
      const res = { status: jest.fn(), json: jest.fn() };
      const next = jest.fn();

      await controller.updateNumFrets(req as any, res as any, next);

      expect(next).toHaveBeenCalledWith(mockError);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });
});
