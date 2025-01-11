import {
  mapFullNoteToMIDINoteNumber,
  mapFullNoteToPitchClass,
  mapBasicNoteToPitchClass,
  mapMIDINoteNumberToPitchClass,
  mapMIDINoteNumberToEnharmonicFullNotes,
  mapMIDINoteNumberToFrequency,
  getPitchClassBitmap,
} from "../../src/utils/note.utils";

describe("mapFullNoteToMIDINoteNumber function", () => {
  it("should return correct MIDI note numbers for valid FullNote", () => {
    expect(mapFullNoteToMIDINoteNumber("A0")).toBe(21);
    expect(mapFullNoteToMIDINoteNumber("C4")).toBe(60);
    expect(mapFullNoteToMIDINoteNumber("Cbb4")).toBe(58);
    expect(mapFullNoteToMIDINoteNumber("C#4")).toBe(61);
    expect(mapFullNoteToMIDINoteNumber("D#5")).toBe(75);
    expect(mapFullNoteToMIDINoteNumber("Ab3")).toBe(56);
    expect(mapFullNoteToMIDINoteNumber("E##2")).toBe(42);
    expect(mapFullNoteToMIDINoteNumber("Ab9")).toBe(128);
  });
  it("should throw errors", () => {
    expect(() => mapFullNoteToMIDINoteNumber("G0")).toThrow(
      new Error("The full note is undefined under mapped MIDI note number")
    );
    expect(() => mapFullNoteToMIDINoteNumber("Cb0")).toThrow(
      new Error("The full note is undefined under mapped MIDI note number")
    );
    expect(() => mapFullNoteToMIDINoteNumber("A9")).toThrow(
      new Error("The full note is undefined under mapped MIDI note number")
    );
  });
});

describe("mapFullNoteToPitchClass function", () => {
  it("should return correct pitch classes for given inputs", () => {
    expect(mapFullNoteToPitchClass("Cb4")).toBe(11);
    expect(mapFullNoteToPitchClass("Cbb4")).toBe(10);
    expect(mapFullNoteToPitchClass("C4")).toBe(0);
    expect(mapFullNoteToPitchClass("D#5")).toBe(3);
    expect(mapFullNoteToPitchClass("Ab3")).toBe(8);
    expect(mapFullNoteToPitchClass("E##2")).toBe(6);
    expect(mapFullNoteToPitchClass("B3")).toBe(11);
    expect(mapFullNoteToPitchClass("B#3")).toBe(0);
    expect(mapFullNoteToPitchClass("B##3")).toBe(1);
  });
});

describe("mapBasicNoteToPitchClass function", () => {
  it("should return correct pitch classes for given inputs", () => {
    expect(mapBasicNoteToPitchClass("Cb")).toBe(11);
    expect(mapBasicNoteToPitchClass("Cbb")).toBe(10);
    expect(mapBasicNoteToPitchClass("C")).toBe(0);
    expect(mapBasicNoteToPitchClass("D#")).toBe(3);
    expect(mapBasicNoteToPitchClass("Ab")).toBe(8);
    expect(mapBasicNoteToPitchClass("E##")).toBe(6);
    expect(mapBasicNoteToPitchClass("B")).toBe(11);
    expect(mapBasicNoteToPitchClass("B#")).toBe(0);
    expect(mapBasicNoteToPitchClass("B##")).toBe(1);
  });
});

describe("mapMIDINoteNumberToPitchClass function", () => {
  it("should return correct pitch classes for given inputs", () => {
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

describe("mapMIDINoteNumberToFrequency function", () => {
  it("should return correct frequencies for given inputs", () => {
    expect(mapMIDINoteNumberToFrequency(69)).toBe(440);
    expect(mapMIDINoteNumberToFrequency(60)).toBe(261.63);
    expect(mapMIDINoteNumberToFrequency(72)).toBe(523.25);
    expect(mapMIDINoteNumberToFrequency(47)).toBe(123.47);
    expect(mapMIDINoteNumberToFrequency(3)).toBe(9.72);
    expect(mapMIDINoteNumberToFrequency(0)).toBe(8.18);
    expect(mapMIDINoteNumberToFrequency(114)).toBe(5919.91);
    expect(mapMIDINoteNumberToFrequency(21)).toBe(27.5);
    expect(mapMIDINoteNumberToFrequency(128)).toBe(13289.75);
  });
});

describe("getPitchClassBitmap function", () => {
  it("should return correct flags for given inputs", () => {
    expect(getPitchClassBitmap(["C", "E", "G"])).toEqual([
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
    ]);
  });
});
