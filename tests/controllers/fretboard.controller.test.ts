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

  it("should return default fretboard on success", async () => {
    const mockFretboard = new Fretboard(
      ["E4", "B3", "G3", "D3", "A2", "E2"],
      21
    );
    mockFretboardService.getDefaultFretboard.mockResolvedValue(mockFretboard);

    const controller = new FretboardController(mockFretboardService);
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    await controller.getDefaultFretboard(req as any, res as any, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ fretboard: mockFretboard });
  });

  it("should call next with an error if getDefaultFretboard throws", async () => {
    const mockError = new Error("Service error");
    mockFretboardService.getDefaultFretboard.mockRejectedValue(mockError);

    const controller = new FretboardController(mockFretboardService);
    const req = {};
    const res = { status: jest.fn(), json: jest.fn() };
    const next = jest.fn();

    await controller.getDefaultFretboard(req as any, res as any, next);

    expect(next).toHaveBeenCalledWith(mockError);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
