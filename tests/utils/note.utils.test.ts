import {
  mapFullNoteToMIDINoteNumber,
  mapFullNoteToPitchClass,
  mapMIDINoteNumberToPitchClass,
  mapMIDINoteNumberToEnharmonicFullNotes,
} from "../../src/utils/note.utils";

describe("mapFullNoteToMIDINoteNumber function", () => {
  it("should return correct MIDI note number for valid FullNote", () => {
    expect(mapFullNoteToMIDINoteNumber("C4")).toBe(60);
    expect(mapFullNoteToMIDINoteNumber("D#5")).toBe(63 + 12);
    expect(mapFullNoteToMIDINoteNumber("Ab3")).toBe(68 - 12);
    expect(mapFullNoteToMIDINoteNumber("E##2")).toBe(66 - 12 * 2);
  });
});

describe("mapFullNoteToPitchClass function", () => {
  it("should return correct pitch class for given inputs", () => {
    expect(mapFullNoteToPitchClass("C4")).toBe(0);
    expect(mapFullNoteToPitchClass("D#5")).toBe(3);
    expect(mapFullNoteToPitchClass("Ab3")).toBe(8);
    expect(mapFullNoteToPitchClass("E##2")).toBe(6);
  });
});

describe("mapMIDINoteNumberToPitchClass function", () => {
  it("should return correct pitch class for given inputs", () => {
    expect(mapMIDINoteNumberToPitchClass(72)).toBe(0);
    expect(mapMIDINoteNumberToPitchClass(47)).toBe(11);
    expect(mapMIDINoteNumberToPitchClass(38)).toBe(2);
    expect(mapMIDINoteNumberToPitchClass(114)).toBe(6);
  });
});

describe("mapMIDINoteNumberToEnharmonicFullNotes function", () => {
  it("should return correct enharmonic full notes for given inputs", () => {
    expect(mapMIDINoteNumberToEnharmonicFullNotes(72)).toEqual(["C5"]);
    expect(mapMIDINoteNumberToEnharmonicFullNotes(47)).toEqual(["B2"]);
    expect(mapMIDINoteNumberToEnharmonicFullNotes(39)).toEqual(["D#2", "Eb2"]);
    expect(mapMIDINoteNumberToEnharmonicFullNotes(114)).toEqual(["F#8", "Gb8"]);
  });
});
