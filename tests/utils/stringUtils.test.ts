import { Fret } from "../../src/models/fret";
import { String } from "../../src/models/string";
import * as utils from "../../src/utils/stringUtils";
import * as fretUtils from "../../src/utils/fretUtils";

describe("initailizeString function", () => {
  it("should initailize String instance with correct process and return type", () => {
    const spy = jest.spyOn(utils, "updateNumFrets");

    const string = utils.initailizeString("C#4", 12);

    expect(spy).toHaveBeenCalledWith(string, 12);
    expect(string).toBeInstanceOf(String);
    expect(string.openString).toBe("C#4");
  });
});

describe("getFret function", () => {
  const string = new String();
  beforeEach(() => {
    string.openString = "Ab3";
    string.frets = Array.from({ length: 5 }, () => new Fret());
  });

  it("should throw errors", () => {
    expect(() => utils.getFret(string, -1)).toThrow(
      new Error("Invalid string index")
    );
    expect(() => utils.getFret(string, 6)).toThrow(
      new Error("Invalid string index")
    );
  });

  it("should get the fret correctly", () => {
    const gottenFret = utils.getFret(string, 4);
    expect(gottenFret).toEqual(string.frets[4]);
  });
});

describe("updateOpenString function", () => {
  it("should update properties correctly", () => {
    const spy = jest.spyOn(fretUtils, "updateMIDINoteNumber");
    const string = new String();
    string.frets = Array.from({ length: 5 }, () => new Fret());
    string.openString = "C4";

    utils.updateOpenString(string, "D#2");

    expect(string.openString).toBe("D#2");
    expect(spy).toHaveBeenCalledTimes(5);
    for (let index = 0; index < 5; index++) {
      expect(spy).toHaveBeenNthCalledWith(
        index + 1,
        string.frets[index],
        39 + index
      );
    }

    spy.mockRestore();
  });
});

describe("updateNumFrets function", () => {
  it("should throw errors", () => {
    expect(() => utils.updateNumFrets(new String(), -1)).toThrow(
      new Error("Number of frets must be larger than 0")
    );
  });

  it("should pop frets correctly", () => {
    const string = new String();
    string.frets = Array.from({ length: 5 }, () => new Fret());

    utils.updateNumFrets(string, 2);

    expect(string.frets.length).toBe(2);
  });

  it("should push frets and update fret properties correctly", () => {
    const string = new String();
    string.openString = "Ab3";
    string.frets = Array.from({ length: 5 }, () => new Fret());

    utils.updateNumFrets(string, 9);

    expect(string.frets.length).toBe(9);
    expect(string.frets[5].midiNoteNumber).toBe(61);
    expect(string.frets[6].midiNoteNumber).toBe(62);
    expect(string.frets[7].midiNoteNumber).toBe(63);
    expect(string.frets[8].midiNoteNumber).toBe(64);
  });
});
