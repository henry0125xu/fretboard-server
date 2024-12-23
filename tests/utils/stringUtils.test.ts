import { FullNote } from "../../src/models/note";
import { String } from "../../src/models/string";
import { setFretMIDINoteNumbersForString } from "../../src/utils/stringUtils";

describe("setFretMIDINoteNumbersForString function", () => {
  it("should set note class for each fret correctly", () => {
    const openString: FullNote = "E##2";
    const numFrets = 15;
    const string: String = new String(openString, numFrets);
    setFretMIDINoteNumbersForString(string);

    for (let fretIndex = 0; fretIndex < numFrets; fretIndex++) {
      expect(string.frets[fretIndex].midiNoteNumber).toBe(42 + fretIndex);
    }
  });
});
