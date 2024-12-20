import { FretboardService } from "../../src/services/fretboard.service";
import { Fretboard } from "../../src/models/fretboard";

describe("FretboardService class", () => {
  let service: FretboardService;

  beforeEach(() => {
    service = new FretboardService();
  });

  describe("getFretboard method", () => {
    it("should return a Fretboard with correct properties", async () => {
      const fretboard = await service.getFretboard();
      expect(fretboard).toBeInstanceOf(Fretboard);
      expect(fretboard.strings.length).toBe(6);
      fretboard.strings.forEach((string) => expect(string.numFrets).toBe(21));
      expect(fretboard.strings.length).toBe(6);
      expect(fretboard.strings[0].openString).toBe("E4");
      expect(fretboard.strings[1].openString).toBe("B3");
      expect(fretboard.strings[2].openString).toBe("G3");
      expect(fretboard.strings[3].openString).toBe("D3");
      expect(fretboard.strings[4].openString).toBe("A2");
      expect(fretboard.strings[5].openString).toBe("E2");
    });
  });

  describe("resetFretboard method", () => {
    it("should return a Fretboard with correct properties", async () => {
      await service.updateFretboardString("5", "D2");
      const fretboard = await service.resetFretboard();
      expect(fretboard).toBeInstanceOf(Fretboard);
      expect(fretboard.strings.length).toBe(6);
      fretboard.strings.forEach((string) => expect(string.numFrets).toBe(21));
      expect(fretboard.strings[0].openString).toBe("E4");
      expect(fretboard.strings[1].openString).toBe("B3");
      expect(fretboard.strings[2].openString).toBe("G3");
      expect(fretboard.strings[3].openString).toBe("D3");
      expect(fretboard.strings[4].openString).toBe("A2");
      expect(fretboard.strings[5].openString).toBe("E2");
    });
  });

  describe("updateFretboardString method", () => {
    it("should return a Fretboard with correct properties", async () => {
      let fretboard = await service.updateFretboardString("5", "D2");
      expect(fretboard).toBeInstanceOf(Fretboard);
      expect(fretboard.strings.length).toBe(6);
      fretboard.strings.forEach((string) => expect(string.numFrets).toBe(21));
      expect(fretboard.strings[0].openString).toBe("E4");
      expect(fretboard.strings[1].openString).toBe("B3");
      expect(fretboard.strings[2].openString).toBe("G3");
      expect(fretboard.strings[3].openString).toBe("D3");
      expect(fretboard.strings[4].openString).toBe("A2");
      expect(fretboard.strings[5].openString).toBe("D2");

      fretboard = await service.updateFretboardString("2", "A3");
      expect(fretboard).toBeInstanceOf(Fretboard);
      expect(fretboard.strings.length).toBe(6);
      fretboard.strings.forEach((string) => expect(string.numFrets).toBe(21));
      expect(fretboard.strings[0].openString).toBe("E4");
      expect(fretboard.strings[1].openString).toBe("B3");
      expect(fretboard.strings[2].openString).toBe("A3");
      expect(fretboard.strings[3].openString).toBe("D3");
      expect(fretboard.strings[4].openString).toBe("A2");
      expect(fretboard.strings[5].openString).toBe("D2");
    });
  });
});
