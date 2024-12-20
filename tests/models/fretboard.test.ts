import { Fretboard } from "../../src/models/fretboard";
import { FullNote } from "../../src/models/note";

describe("Fretboard class", () => {
  let fretboard: Fretboard;
  const openStrings: FullNote[] = ["E4", "A4", "D4", "G4", "B4", "E5"];
  const numFrets = 12;

  beforeEach(() => {
    fretboard = new Fretboard(openStrings, numFrets);
  });

  it("should initialize with correct open strings number of strings and frets", () => {
    expect(fretboard.strings.length).toBe(openStrings.length);

    for (
      let stringIndex = 0;
      stringIndex < fretboard.strings.length;
      stringIndex++
    ) {
      expect(fretboard.strings[stringIndex].numFrets).toBe(numFrets);
      expect(fretboard.strings[stringIndex].openString).toBe(
        openStrings[stringIndex]
      );
    }
  });

  it("should throw error during initailization for invalid numebr of strings and frets", () => {
    expect(() => (fretboard = new Fretboard([], numFrets))).toThrow(
      "Number of strings must be larger than 0"
    );

    expect(() => (fretboard = new Fretboard(openStrings, 0))).toThrow(
      "Number of frets must be larger than 0"
    );
  });

  it("should get properties correctly", () => {
    expect(fretboard.numFrets).toBe(numFrets);
    expect(fretboard.numStrings).toBe(openStrings.length);
    expect(fretboard.openStrings).toEqual(openStrings);
  });

  it("should press and release correctly on valid string and fret", () => {
    fretboard.press(0, 0);
    expect(fretboard.isPressed(0, 0)).toBe(true);

    fretboard.release(0, 0);
    expect(fretboard.isPressed(0, 0)).toBe(false);
  });

  it("should throw error for invalid string or fret index on press", () => {
    expect(() => fretboard.press(6, 0)).toThrow("Invalid string or fret index");
    expect(() => fretboard.press(0, 12)).toThrow(
      "Invalid string or fret index"
    );
  });

  it("should throw error for invalid string or fret index on release", () => {
    expect(() => fretboard.release(6, 0)).toThrow(
      "Invalid string or fret index"
    );
    expect(() => fretboard.release(0, 12)).toThrow(
      "Invalid string or fret index"
    );
  });

  it("should return correct pressed state for valid position", () => {
    fretboard.press(0, 1);
    expect(fretboard.isPressed(0, 1)).toBe(true);

    fretboard.release(0, 1);
    expect(fretboard.isPressed(0, 1)).toBe(false);
  });

  it("should throw error if checking isPressed on invalid string or fret", () => {
    expect(() => fretboard.isPressed(6, 0)).toThrow(
      "Invalid string or fret index"
    );
    expect(() => fretboard.isPressed(0, 12)).toThrow(
      "Invalid string or fret index"
    );
  });
});
