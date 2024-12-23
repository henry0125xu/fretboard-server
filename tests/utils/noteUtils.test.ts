import {
  mapFullNoteToMIDINoteNumber,
  mapFullNoteToPitchClass,
  mapMIDINoteNumberToPitchClass,
} from "../../src/utils/noteUtils";

describe("mapFullNoteToMIDINoteNumber function", () => {
  it("should return correct note code for valid FullNote", () => {
    expect(mapFullNoteToMIDINoteNumber("C4")).toBe(60);
    expect(mapFullNoteToMIDINoteNumber("D#5")).toBe(63 + 12);
    expect(mapFullNoteToMIDINoteNumber("Ab3")).toBe(68 - 12);
    expect(mapFullNoteToMIDINoteNumber("E##2")).toBe(66 - 12 * 2);
  });
});

describe("mapFullNoteToPitchClass function", () => {
  it("should return correct note class for given inputs", () => {
    expect(mapFullNoteToPitchClass("C4")).toBe(0);
    expect(mapFullNoteToPitchClass("D#5")).toBe(3);
    expect(mapFullNoteToPitchClass("Ab3")).toBe(8);
    expect(mapFullNoteToPitchClass("E##2")).toBe(6);
  });
});

describe("mapMIDINoteNumberToPitchClass function", () => {
  it("should return correct note class for given inputs", () => {
    expect(mapMIDINoteNumberToPitchClass(72)).toBe(0);
    expect(mapMIDINoteNumberToPitchClass(47)).toBe(11);
    expect(mapMIDINoteNumberToPitchClass(38)).toBe(2);
    expect(mapMIDINoteNumberToPitchClass(114)).toBe(6);
  });
});
