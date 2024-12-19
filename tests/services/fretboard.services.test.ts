import { FretboardService } from "../../src/services/fretboard.service";
import { Fretboard } from "../../src/models/fretboard";

describe("FretboardService class", () => {
  let service: FretboardService;

  beforeEach(() => {
    service = new FretboardService();
  });

  it("should return a Fretboard instance", async () => {
    const fretboard = await service.getDefaultFretboard();
    expect(fretboard).toBeInstanceOf(Fretboard);
  });

  it("should return a Fretboard with correct properties", async () => {
    const fretboard = await service.getDefaultFretboard();

    expect(fretboard.numStrings).toBe(6);
    expect(fretboard.numFrets).toBe(21);
    expect(fretboard.strings.length).toBe(6);
    expect(fretboard.strings[0].openString).toBe("E4");
    expect(fretboard.strings[1].openString).toBe("B3");
    expect(fretboard.strings[2].openString).toBe("G3");
    expect(fretboard.strings[3].openString).toBe("D3");
    expect(fretboard.strings[4].openString).toBe("A2");
    expect(fretboard.strings[5].openString).toBe("E2");
  });
});
