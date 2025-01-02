import { Fret } from "../../src/models/fret";
import {
  Fretboard,
  DEFAULT_OPEN_STRINGS,
  DEFAULT_NUM_FRETS,
} from "../../src/models/fretboard";
import { FullNote } from "../../src/models/note";
import { String } from "../../src/models/string";
import * as utils from "../../src/utils/fretboard.utils";
import * as stringUtils from "../../src/utils/string.utils";

describe("initializeFretboard function", () => {
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
    const invalidNumFrets = 0;

    expect(() =>
      utils.initializeFretboard(invalidOpenStrings, validNumFrets)
    ).toThrow(new Error("Number of strings must be larger than 0"));
    expect(() =>
      utils.initializeFretboard(validOpenStrings, invalidNumFrets)
    ).toThrow(
      new Error(
        "Number of frets must be larger than 0 ( including open string )"
      )
    );
    expect(() =>
      utils.initializeFretboard(invalidOpenStrings, invalidNumFrets)
    ).toThrow(new Error("Number of strings must be larger than 0"));
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
  it("should throw errors and leave 1 string", () => {
    expect(() => {
      while (true) {
        utils.deleteString(fretboard, 0);
      }
    }).toThrow(new Error("Number of strings must be larger than 0"));
    expect(fretboard.strings.length).toBe(1);
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

describe("forEachFret function", () => {
  const fretboard = new Fretboard();
  beforeEach(() => {
    fretboard.strings = Array.from({ length: 3 }, () => new String());
    fretboard.strings.forEach(
      (string) => (string.frets = Array.from({ length: 4 }, () => new Fret()))
    );
    fretboard.strings.forEach((string, stringIndex) => {
      string.frets.forEach(
        (fret, fretIndex) => (fret.frequency = stringIndex * 2 + fretIndex * 3)
      );
    });
  });
  it("should insert the string correctly", () => {
    const callback = jest.fn().mockReturnValue(undefined);

    utils.forEachFret(fretboard, callback);

    expect(callback).toHaveBeenCalledTimes(12);
    expect(callback).toHaveBeenNthCalledWith(1, fretboard.strings[0].frets[0]);
    expect(callback).toHaveBeenNthCalledWith(2, fretboard.strings[0].frets[1]);
    expect(callback).toHaveBeenNthCalledWith(3, fretboard.strings[0].frets[2]);
    expect(callback).toHaveBeenNthCalledWith(4, fretboard.strings[0].frets[3]);
    expect(callback).toHaveBeenNthCalledWith(5, fretboard.strings[1].frets[0]);
    expect(callback).toHaveBeenNthCalledWith(6, fretboard.strings[1].frets[1]);
    expect(callback).toHaveBeenNthCalledWith(7, fretboard.strings[1].frets[2]);
    expect(callback).toHaveBeenNthCalledWith(8, fretboard.strings[1].frets[3]);
    expect(callback).toHaveBeenNthCalledWith(9, fretboard.strings[2].frets[0]);
    expect(callback).toHaveBeenNthCalledWith(10, fretboard.strings[2].frets[1]);
    expect(callback).toHaveBeenNthCalledWith(11, fretboard.strings[2].frets[2]);
    expect(callback).toHaveBeenNthCalledWith(12, fretboard.strings[2].frets[3]);
  });
});

describe("forEachFret function", () => {
  const fretboard = new Fretboard();
  beforeEach(() => {
    fretboard.strings = Array.from({ length: 3 }, () => new String());
    fretboard.strings.forEach(
      (string) => (string.frets = Array.from({ length: 4 }, () => new Fret()))
    );
  });
  it("should press frets correctly", () => {
    fretboard.strings.forEach((string) =>
      string.frets.forEach((fret) => {
        fret.isPressed = Math.random() < 0.5;
      })
    );

    fretboard.strings[0].frets[0].pitchClass = 2;
    fretboard.strings[0].frets[1].pitchClass = 3;
    fretboard.strings[0].frets[2].pitchClass = 4;
    fretboard.strings[0].frets[3].pitchClass = 5;
    fretboard.strings[1].frets[0].pitchClass = 11;
    fretboard.strings[1].frets[1].pitchClass = 0;
    fretboard.strings[1].frets[2].pitchClass = 1;
    fretboard.strings[1].frets[3].pitchClass = 2;
    fretboard.strings[2].frets[0].pitchClass = 7;
    fretboard.strings[2].frets[1].pitchClass = 8;
    fretboard.strings[2].frets[2].pitchClass = 9;
    fretboard.strings[2].frets[3].pitchClass = 10;

    utils.pressBasicNotes(fretboard, ["C", "E", "G"]);

    expect(fretboard.strings[0].frets[0].isPressed).toBe(false);
    expect(fretboard.strings[0].frets[1].isPressed).toBe(false);
    expect(fretboard.strings[0].frets[2].isPressed).toBe(true);
    expect(fretboard.strings[0].frets[3].isPressed).toBe(false);
    expect(fretboard.strings[1].frets[0].isPressed).toBe(false);
    expect(fretboard.strings[1].frets[1].isPressed).toBe(true);
    expect(fretboard.strings[1].frets[2].isPressed).toBe(false);
    expect(fretboard.strings[1].frets[3].isPressed).toBe(false);
    expect(fretboard.strings[2].frets[0].isPressed).toBe(true);
    expect(fretboard.strings[2].frets[1].isPressed).toBe(false);
    expect(fretboard.strings[2].frets[2].isPressed).toBe(false);
    expect(fretboard.strings[2].frets[3].isPressed).toBe(false);
  });
});
