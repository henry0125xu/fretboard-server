import { Fretboard } from "../../src/models/fretboard";
import { FullNote } from "../../src/models/note";
import { setFretMIDINoteNumbersForFretboard } from "../../src/utils/fretboardUtils";

describe("setFretClassesForFretboard function", () => {
  it("should set note class for each fret correctly", () => {
    const openStrings: FullNote[] = ["E4", "B3", "G3", "D3", "A2", "E2"];
    const openStringMIDINoteNumbers = [64, 59, 55, 50, 45, 40];
    const numStrings = openStrings.length;
    const numFrets = 22;
    const fretboard = new Fretboard(openStrings, numFrets);
    setFretMIDINoteNumbersForFretboard(fretboard);

    for (let stringIndex = 0; stringIndex < numStrings; stringIndex++) {
      for (let fretIndex = 0; fretIndex < numFrets; fretIndex++) {
        const fret = fretboard.strings[stringIndex].frets[fretIndex];
        expect(fret.midiNoteNumber).toBe(
          openStringMIDINoteNumbers[stringIndex] + fretIndex
        );
      }
    }
  });
});
