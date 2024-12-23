import { FullNote } from "../../src/models/note";
import { String } from "../../src/models/string";
import { setFretMIDINoteNumbers } from "../../src/utils/stringUtils";

describe("setFretMIDINoteNumbers function", () => {
  it("should set the MIDI note number for each fret correctly", () => {
    const openString: FullNote = "E##2";
    const numFrets = 15;
    const string: String = new String(openString, numFrets);
    setFretMIDINoteNumbers(string);

    for (let fretIndex = 0; fretIndex < numFrets; fretIndex++) {
      expect(string.frets[fretIndex].midiNoteNumber).toBe(42 + fretIndex);
    }
  });
});
