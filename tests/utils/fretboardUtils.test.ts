import { Fretboard } from "../../src/models/fretboard";
import { FullNote } from "../../src/models/note";
import { setFretClassesForFretboard } from "../../src/utils/fretboardUtils";

describe("setFretClassesForFretboard function", () => {
  it("should set note class for each fret correctly", () => {
    const openStrings: FullNote[] = ["E4", "B3", "G3", "D3", "A2", "E2"];
    const openStringCode = [4, 11, 7, 2, 9, 4];
    const numStrings = openStringCode.length;
    const numFrets = 22;
    const fretboard = new Fretboard(openStrings, numFrets);
    setFretClassesForFretboard(fretboard);

    for (let stringIndex = 0; stringIndex < numStrings; stringIndex++) {
      for (let fretIndex = 0; fretIndex < numFrets; fretIndex++) {
        const fret = fretboard.strings[stringIndex].frets[fretIndex];
        expect(fret.class).toBe((openStringCode[stringIndex] + fretIndex) % 12);
      }
    }
  });
});
