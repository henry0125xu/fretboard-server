import { Fretboard } from "../../src/models/fretboard";

describe("Fretboard class", () => {
  let fretboard: Fretboard;

  beforeEach(() => {
    fretboard = new Fretboard(["E4", "A4", "D4", "G4", "B4", "E5"], 12);
  });

  it("should initialize with correct number of strings and frets", () => {
    expect(fretboard.numStrings).toBe(6);
    expect(fretboard.numFrets).toBe(12);
    expect(fretboard.strings.length).toBe(6);
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
