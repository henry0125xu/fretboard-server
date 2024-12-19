import { mapToFullNote, mapToNoteCode } from "../../src/utils/noteUtils";
import { FullNote, Note, Accidental, Octave } from "../../src/models/note";

describe("mapToFullNote function", () => {
  it("should return correct FullNote for given inputs", () => {
    expect(mapToFullNote(Note.C, Accidental.Natural, Octave.Octave4)).toBe(
      "C4"
    );
    expect(mapToFullNote(Note.D, Accidental.Sharp, Octave.Octave5)).toBe("#D5");
    expect(mapToFullNote(Note.A, Accidental.Flat, Octave.Octave3)).toBe("bA3");
    expect(mapToFullNote(Note.E, Accidental.DoubleSharp, Octave.Octave2)).toBe(
      "##E2"
    );
  });
});

describe("mapToNoteCode function", () => {
  it("should return correct note code for valid FullNote", () => {
    expect(mapToNoteCode("C4")).toBe(0);
    expect(mapToNoteCode("#D5")).toBe(3 + 12);
    expect(mapToNoteCode("bA3")).toBe(8 - 12);
    expect(mapToNoteCode("##E2")).toBe(6 - 12 * 2);
  });
});
