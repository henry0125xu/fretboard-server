import { String } from "../../src/models/string";
import { Fret } from "../../src/models/fret";
import { FullNote } from "../../src/models/note";
import { mapToNoteCode } from "../../src/utils/noteUtils";

describe("String class", () => {
  const openString: FullNote = "E4";
  const numFrets = 5;

  let string: String;

  beforeEach(() => {
    string = new String(openString, numFrets);
  });

  it("should initialize the string with the correct number of frets", () => {
    expect(string.frets.length).toBe(numFrets);
  });

  it("should initialize frets with the correct noteCode", () => {
    for (let fretIndex = 0; fretIndex < numFrets; fretIndex++) {
      const expectedNoteCode = mapToNoteCode(openString) + fretIndex;
      expect(string.frets[fretIndex].noteCode).toBe(expectedNoteCode);
    }
  });

  it("should initialize frets correctly", () => {
    string.frets.forEach((fret) => {
      expect(fret).toBeInstanceOf(Fret);
    });
  });
});
