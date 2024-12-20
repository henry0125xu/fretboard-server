import { FretboardService } from "../../src/services/fretboard.service";
import { Fretboard } from "../../src/models/fretboard";

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
      await service.updateFretboardString("5", "D2");
      const fretboard = await service.resetFretboard();
      assertDefaultFretboard(fretboard);
    });
  });

  describe("updateFretboardString method", () => {
    it("should return a Fretboard with correct properties", async () => {
      let fretboard = await service.updateFretboardString("5", "D2");
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
      for (let fretIndex = 0; fretIndex < updatedString.numFrets; fretIndex++) {
        expect(updatedString.frets[fretIndex].class).toBe((2 + fretIndex) % 12);
      }
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

  const openStringCode = [4, 11, 7, 2, 9, 4];
  for (let stringIndex = 0; stringIndex < numStrings; stringIndex++) {
    for (let fretIndex = 0; fretIndex < numFrets; fretIndex++) {
      const fret = fretboard.strings[stringIndex].frets[fretIndex];
      expect(fret.class).toBe((openStringCode[stringIndex] + fretIndex) % 12);
    }
  }
}
