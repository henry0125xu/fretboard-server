import { Fret } from "../../src/models/fret";
import {
  Fretboard,
  DEFAULT_OPEN_STRINGS,
  DEFAULT_NUM_FRETS,
} from "../../src/models/fretboard";
import { FullNote } from "../../src/models/note";
import { String } from "../../src/models/string";
import * as utils from "../../src/utils/fretboardUtils";
import * as stringUtils from "../../src/utils/stringUtils";

describe("initailizeString function", () => {
  it("should initailize default Fretboard instance with correct process and return type", () => {
    const spy = jest.spyOn(stringUtils, "initailizeString");
    const defaultNumStrings = DEFAULT_OPEN_STRINGS.length;

    const fretboard = utils.initializeFretboard();

    expect(fretboard).toBeInstanceOf(Fretboard);
    expect(fretboard.strings.length).toBe(defaultNumStrings);
    fretboard.strings.forEach((string) =>
      expect(string.frets.length).toBe(DEFAULT_NUM_FRETS)
    );
    expect(spy).toHaveBeenCalledTimes(defaultNumStrings);
    for (let index = 0; index < defaultNumStrings; index++) {
      expect(spy).toHaveBeenNthCalledWith(
        index + 1,
        DEFAULT_OPEN_STRINGS[index],
        DEFAULT_NUM_FRETS
      );
    }

    spy.mockRestore();
  });
  it("should initailize specific Fretboard instance with correct process and return type", () => {
    const spy = jest.spyOn(stringUtils, "initailizeString");
    const openStrings: FullNote[] = ["C2", "D3", "G#3"];
    const numStrings = openStrings.length;
    const numFrets = 9;

    const fretboard = utils.initializeFretboard(openStrings, numFrets);

    expect(fretboard).toBeInstanceOf(Fretboard);
    expect(fretboard.strings.length).toBe(numStrings);
    fretboard.strings.forEach((string) =>
      expect(string.frets.length).toBe(numFrets)
    );
    expect(spy).toHaveBeenCalledTimes(numStrings);
    for (let index = 0; index < numStrings; index++) {
      expect(spy).toHaveBeenNthCalledWith(
        index + 1,
        openStrings[index],
        numFrets
      );
    }

    spy.mockRestore();
  });
  it("should throw errors", () => {
    const validOpenStrings: FullNote[] = ["C2", "D3", "G#3"];
    const validNumFrets = 9;
    const invalidOpenStrings: FullNote[] = [];
    const invalidNumFrets = -1;

    expect(() =>
      utils.initializeFretboard(invalidOpenStrings, validNumFrets)
    ).toThrow(new Error("Number of strings must be larger than 0"));
    expect(() =>
      utils.initializeFretboard(validOpenStrings, invalidNumFrets)
    ).toThrow(new Error("Number of frets must be larger than 0"));
    expect(() =>
      utils.initializeFretboard(invalidOpenStrings, invalidNumFrets)
    ).toThrow(new Error("Number of strings must be larger than 0"));
  });
});

describe("pressFret, releaseFret, and isFretPressed functions", () => {
  const fretboard = new Fretboard();
  const numStrings = 5;
  const numFrets = 11;
  beforeEach(() => {
    fretboard.strings = Array.from({ length: numStrings }, () => new String());
    fretboard.strings.forEach(
      (string) =>
        (string.frets = Array.from({ length: numFrets }, () => new Fret()))
    );
  });

  it("should press the fret on the correct position", () => {
    utils.pressFret(fretboard, 3, 5);
    expect(fretboard.strings[3].frets[5].isPressed).toBe(true);
  });
  it("should release the fret on the correct position", () => {
    utils.releaseFret(fretboard, 1, 8);
    expect(fretboard.strings[1].frets[8].isPressed).toBe(false);
  });
  it("should release the fret on the correct position", () => {
    fretboard.strings[4].frets[10].isPressed = true;
    expect(utils.isFretPressed(fretboard, 4, 10)).toBe(
      fretboard.strings[4].frets[10].isPressed
    );
    fretboard.strings[4].frets[10].isPressed = false;
    expect(utils.isFretPressed(fretboard, 4, 10)).toBe(
      fretboard.strings[4].frets[10].isPressed
    );
  });
  it("should throw errors", () => {
    expect(() => utils.pressFret(fretboard, 6, 5)).toThrow();
    expect(() => utils.pressFret(fretboard, 2, 15)).toThrow();
    expect(() => utils.releaseFret(fretboard, -2, 5)).toThrow();
    expect(() => utils.releaseFret(fretboard, 2, -5)).toThrow();
    expect(() => utils.isFretPressed(fretboard, 42, -5)).toThrow();
    expect(() => utils.isFretPressed(fretboard, 77, 100)).toThrow();
  });
});

describe("getString function", () => {
  const fretboard = new Fretboard();
  beforeEach(() => {
    fretboard.strings = Array.from({ length: 7 }, () => new String());
  });
  it("should get the string correctly", () => {
    const actual = utils.getString(fretboard, 5);
    const expected = fretboard.strings[5];
    expect(actual).toBe(expected);
  });
  it("should throw errors", () => {
    expect(() => utils.getString(fretboard, -1)).toThrow(
      new Error("Invalid string index")
    );
    expect(() => utils.getString(fretboard, 8)).toThrow(
      new Error("Invalid string index")
    );
  });
});

describe("deleteString function", () => {
  const fretboard = new Fretboard();
  beforeEach(() => {
    fretboard.strings = Array.from({ length: 6 }, () => new String());
  });
  it("should delete the string and compress the left correctly", () => {
    const oldStrings = fretboard.strings.map((string) => string);

    utils.deleteString(fretboard, 3);

    expect(fretboard.strings.length).toBe(5);
    expect(fretboard.strings[0]).toBe(oldStrings[0]);
    expect(fretboard.strings[1]).toBe(oldStrings[1]);
    expect(fretboard.strings[2]).toBe(oldStrings[2]);
    expect(fretboard.strings[3]).toBe(oldStrings[4]);
    expect(fretboard.strings[4]).toBe(oldStrings[5]);
    expect(fretboard.strings[3]).not.toBe(oldStrings[3]);
    expect(fretboard.strings[4]).not.toBe(oldStrings[4]);
  });
  it("should throw errors", () => {
    expect(() => utils.deleteString(fretboard, -1)).toThrow(
      new Error("Invalid string index")
    );
    expect(() => utils.deleteString(fretboard, 8)).toThrow(
      new Error("Invalid string index")
    );
  });
});

describe("insertString function", () => {
  const fretboard = new Fretboard();
  beforeEach(() => {
    fretboard.strings = Array.from({ length: 6 }, () => new String());
  });
  it("should insert the string correctly", () => {
    const oldStrings = fretboard.strings.map((string) => string);
    const stringToInsert = new String();

    utils.insertString(fretboard, stringToInsert, 4);

    expect(fretboard.strings.length).toBe(7);
    expect(fretboard.strings[0]).toBe(oldStrings[0]);
    expect(fretboard.strings[1]).toBe(oldStrings[1]);
    expect(fretboard.strings[2]).toBe(oldStrings[2]);
    expect(fretboard.strings[3]).toBe(oldStrings[3]);
    expect(fretboard.strings[4]).toBe(stringToInsert);
    expect(fretboard.strings[5]).toBe(oldStrings[4]);
    expect(fretboard.strings[6]).toBe(oldStrings[5]);
    expect(fretboard.strings[4]).not.toBe(oldStrings[4]);
    expect(fretboard.strings[5]).not.toBe(oldStrings[5]);
  });
  it("should throw errors", () => {
    expect(() => utils.insertString(fretboard, new String(), -1)).toThrow(
      new Error("Invalid string index")
    );
    expect(() => utils.insertString(fretboard, new String(), 7)).toThrow(
      new Error("Invalid string index")
    );
  });
  it("should not throw errors", () => {
    expect(() => utils.insertString(fretboard, new String(), 0)).not.toThrow();
    expect(() => utils.insertString(fretboard, new String(), 6)).not.toThrow();
  });
});
