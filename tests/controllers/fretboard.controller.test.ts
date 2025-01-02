import { FretboardService } from "../../src/services/fretboard.service";
import { FretboardController } from "../../src/controllers/fretboard.controller";
import { Fretboard } from "../../src/models/fretboard";
import { Store } from "../../src/models/store";

jest.mock("../../src/services/fretboard.service");

describe("FretboardController class", () => {
  let mockFretboardService: jest.Mocked<FretboardService>;
  let mockFretboard: Fretboard;
  let mockStore: Store;
  let mockError: Error;
  beforeEach(() => {
    mockStore = {
      get: jest.fn().mockResolvedValue(mockFretboard),
      set: jest.fn().mockResolvedValue(undefined),
      delete: jest.fn().mockResolvedValue(undefined),
    };
    mockFretboardService = new FretboardService(
      mockStore
    ) as jest.Mocked<FretboardService>;

    mockFretboard = new Fretboard();
    mockError = new Error("Service error");
  });

  describe("getFretboard method", () => {
    it("should return fretboard on success", async () => {
      mockFretboardService.getFretboard.mockResolvedValue(mockFretboard);

      const controller = new FretboardController(mockFretboardService);
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();

      await controller.getFretboard(req as any, res as any, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ fretboard: mockFretboard });
    });

    it("should call next with an error if getFretboard throws", async () => {
      mockFretboardService.getFretboard.mockRejectedValue(mockError);

      const controller = new FretboardController(mockFretboardService);
      const req = {};
      const res = { status: jest.fn(), json: jest.fn() };
      const next = jest.fn();

      await controller.getFretboard(req as any, res as any, next);

      expect(next).toHaveBeenCalledWith(mockError);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe("resetFretboard method", () => {
    it("should return fretboard on success", async () => {
      mockFretboardService.resetFretboard.mockResolvedValue(mockFretboard);

      const controller = new FretboardController(mockFretboardService);
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();

      await controller.resetFretboard(req as any, res as any, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ fretboard: mockFretboard });
    });

    it("should call next with an error if resetFretboard throws", async () => {
      mockFretboardService.resetFretboard.mockRejectedValue(mockError);

      const controller = new FretboardController(mockFretboardService);
      const req = {};
      const res = { status: jest.fn(), json: jest.fn() };
      const next = jest.fn();

      await controller.resetFretboard(req as any, res as any, next);

      expect(next).toHaveBeenCalledWith(mockError);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe("insertString method", () => {
    it("should return fretboard on success", async () => {
      mockFretboardService.insertString.mockResolvedValue(mockFretboard);

      const controller = new FretboardController(mockFretboardService);
      const req = { params: { stringId: "2" }, body: { openString: "Db4" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();

      await controller.insertString(req as any, res as any, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ fretboard: mockFretboard });
    });

    it("should call next with an error if insertString throws", async () => {
      mockFretboardService.insertString.mockRejectedValue(mockError);

      const controller = new FretboardController(mockFretboardService);
      const req = { params: { stringId: "2" }, body: { openString: "Db4" } };
      const res = { status: jest.fn(), json: jest.fn() };
      const next = jest.fn();

      await controller.insertString(req as any, res as any, next);

      expect(next).toHaveBeenCalledWith(mockError);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe("deleteString method", () => {
    it("should return fretboard on success", async () => {
      mockFretboardService.deleteString.mockResolvedValue(mockFretboard);

      const controller = new FretboardController(mockFretboardService);
      const req = { params: { stringId: "2" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();

      await controller.deleteString(req as any, res as any, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ fretboard: mockFretboard });
    });

    it("should call next with an error if deleteString throws", async () => {
      mockFretboardService.deleteString.mockRejectedValue(mockError);

      const controller = new FretboardController(mockFretboardService);
      const req = { params: { stringId: "2" } };
      const res = { status: jest.fn(), json: jest.fn() };
      const next = jest.fn();

      await controller.deleteString(req as any, res as any, next);

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
      const req = { body: { numFrets: "15" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();

      await controller.updateNumFrets(req as any, res as any, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ fretboard: mockFretboard });
    });

    it("should call next with an error if updateNumFrets throws", async () => {
      mockFretboardService.updateNumFrets.mockRejectedValue(mockError);

      const controller = new FretboardController(mockFretboardService);
      const req = { body: { numFrets: "15" } };
      const res = { status: jest.fn(), json: jest.fn() };
      const next = jest.fn();

      await controller.updateNumFrets(req as any, res as any, next);

      expect(next).toHaveBeenCalledWith(mockError);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe("pressNotes method", () => {
    it("should return fretboard on success", async () => {
      mockFretboardService.pressNotes.mockResolvedValue(mockFretboard);

      const controller = new FretboardController(mockFretboardService);
      const req = { body: { notes: ["C", "E", "G"] } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();

      await controller.pressNotes(req as any, res as any, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ fretboard: mockFretboard });
    });

    it("should call next with an error if pressNotes throws", async () => {
      mockFretboardService.pressNotes.mockRejectedValue(mockError);

      const controller = new FretboardController(mockFretboardService);
      const req = { body: { notes: ["C", "E", "G"] } };
      const res = { status: jest.fn(), json: jest.fn() };
      const next = jest.fn();

      await controller.pressNotes(req as any, res as any, next);

      expect(next).toHaveBeenCalledWith(mockError);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });
});
