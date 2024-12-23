import { FretboardService } from "../../src/services/fretboard.service";
import { Fretboard } from "../../src/models/fretboard";
import * as stringUtils from "../../src/utils/stringUtils";
import { AppError } from "../../src/errors/appError";

let service: FretboardService;
const numFrets = 22;
const numStrings = 6;
describe("FretboardService class", () => {
  beforeEach(() => {
    service = new FretboardService();
  });

  describe("getFretboard method", () => {
    it("should return a Fretboard with correct properties", async () => {
      const fretboard = await service.getFretboard();
      assertDefaultFretboard(fretboard);
    });
  });

  describe("resetFretboard method", () => {
    it("should return a Fretboard with correct properties", async () => {
      await service.updateOpenString("5", "D2");
      const fretboard = await service.resetFretboard();
      assertDefaultFretboard(fretboard);
    });
  });

  describe("updateOpenString method", () => {
    it("should return a Fretboard with correct open strings and call setFretMIDINoteNumbers with the updated string", async () => {
      const spy = jest.spyOn(stringUtils, "setFretMIDINoteNumbers");

      let fretboard = await service.updateOpenString("5", "D2");
      expect(fretboard).toBeInstanceOf(Fretboard);
      expect(fretboard.numStrings).toBe(numStrings);
      expect(fretboard.numFrets).toBe(numFrets);
      expect(fretboard.strings[0].openString).toBe("E4");
      expect(fretboard.strings[1].openString).toBe("B3");
      expect(fretboard.strings[2].openString).toBe("G3");
      expect(fretboard.strings[3].openString).toBe("D3");
      expect(fretboard.strings[4].openString).toBe("A2");
      expect(fretboard.strings[5].openString).toBe("D2");

      const updatedString = fretboard.strings[5];
      expect(spy).toHaveBeenCalledWith(updatedString);

      spy.mockRestore();
    });

    it("should throw errors", async () => {
      await expect(service.updateOpenString("3", "#bC10")).rejects.toThrow(
        new AppError("Not Found", 404)
      );

      await expect(service.updateOpenString("-1", "C4")).rejects.toThrow(
        new AppError("Not Found", 404)
      );
    });
  });

  describe("updateNumFrets method", () => {
    it("should return a Fretboard with correct number of frets and call setFretMIDINoteNumbers with each string", async () => {
      const spy = jest.spyOn(stringUtils, "setFretMIDINoteNumbers");
      const numFrets = "25";
      let fretboard = await service.updateNumFrets(numFrets);

      expect(fretboard.numFrets).toBe(Number(numFrets));

      for (let stringIndex = 0; stringIndex < numStrings; stringIndex++) {
        expect(spy).toHaveBeenCalledWith(fretboard.strings[stringIndex]);
      }

      spy.mockRestore();
    });

    it("should return a Fretboard with correct number of frets and not call setFretMIDINoteNumbers on any string", async () => {
      const spy = jest.spyOn(stringUtils, "setFretMIDINoteNumbers");
      const numFrets = "15";
      let fretboard = await service.updateNumFrets(numFrets);

      expect(fretboard.numFrets).toBe(Number(numFrets));

      for (let stringIndex = 0; stringIndex < numStrings; stringIndex++) {
        expect(spy).not.toHaveBeenCalledWith(fretboard.strings[stringIndex]);
      }

      spy.mockRestore();
    });

    it("should throw errors", async () => {
      await expect(service.updateNumFrets("-3")).rejects.toThrow(
        new AppError("Not Found", 404)
      );
    });
  });
});

function assertDefaultFretboard(fretboard: Fretboard) {
  expect(fretboard).toBeInstanceOf(Fretboard);
  expect(fretboard.numStrings).toBe(numStrings);
  expect(fretboard.numFrets).toBe(numFrets);
  expect(fretboard.strings[0].openString).toBe("E4");
  expect(fretboard.strings[1].openString).toBe("B3");
  expect(fretboard.strings[2].openString).toBe("G3");
  expect(fretboard.strings[3].openString).toBe("D3");
  expect(fretboard.strings[4].openString).toBe("A2");
  expect(fretboard.strings[5].openString).toBe("E2");
  const openStringMIDINoteNumbers = [64, 59, 55, 50, 45, 40];

  for (let stringIndex = 0; stringIndex < numStrings; stringIndex++) {
    for (let fretIndex = 0; fretIndex < numFrets; fretIndex++) {
      const fret = fretboard.strings[stringIndex].frets[fretIndex];
      expect(fret.midiNoteNumber).toBe(
        openStringMIDINoteNumbers[stringIndex] + fretIndex
      );
    }
  }
}
