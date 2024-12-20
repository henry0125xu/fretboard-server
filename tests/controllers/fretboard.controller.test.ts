import { FretboardService } from "../../src/services/fretboard.service";
import { FretboardController } from "../../src/controllers/fretboard.controller";
import { Fretboard } from "../../src/models/fretboard";

jest.mock("../../src/services/fretboard.service");

describe("FretboardController class", () => {
  let mockFretboardService: jest.Mocked<FretboardService>;

  beforeEach(() => {
    mockFretboardService =
      new FretboardService() as jest.Mocked<FretboardService>;
  });

  describe("getFretboard method", () => {
    it("should return fretboard on success", async () => {
      const mockFretboard = new Fretboard(
        ["E4", "B3", "G3", "D3", "A2", "E2"],
        21
      );
      mockFretboardService.getFretboard.mockResolvedValue(mockFretboard);

      const controller = new FretboardController(mockFretboardService);
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();

      await controller.getFretboard(res as any, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ fretboard: mockFretboard });
    });

    it("should call next with an error if getFretboard throws", async () => {
      const mockError = new Error("Service error");
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
      const mockFretboard = new Fretboard(
        ["E4", "B3", "G3", "D3", "A2", "E2"],
        21
      );
      mockFretboardService.resetFretboard.mockResolvedValue(mockFretboard);

      const controller = new FretboardController(mockFretboardService);
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();

      await controller.resetFretboard(res as any, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ fretboard: mockFretboard });
    });

    it("should call next with an error if resetFretboard throws", async () => {
      const mockError = new Error("Service error");
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

  describe("updateFretboardString method", () => {
    it("should return fretboard on success", async () => {
      const mockFretboard = new Fretboard(
        ["D4", "B3", "G3", "D3", "A2", "E2"],
        21
      );

      mockFretboardService.updateFretboardString.mockResolvedValue(
        mockFretboard
      );

      const controller = new FretboardController(mockFretboardService);
      const req = { params: { stringId: "0" }, body: { openString: "D4" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();

      await controller.updateFretboardString(req as any, res as any, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ fretboard: mockFretboard });
    });

    it("should call next with an error if updateFretboardString throws", async () => {
      const mockError = new Error("Service error");
      mockFretboardService.updateFretboardString.mockRejectedValue(mockError);

      const controller = new FretboardController(mockFretboardService);
      const req = { params: { stringId: "0" }, body: { openString: "D4" } };
      const res = { status: jest.fn(), json: jest.fn() };
      const next = jest.fn();

      await controller.updateFretboardString(req as any, res as any, next);

      expect(next).toHaveBeenCalledWith(mockError);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });
});
