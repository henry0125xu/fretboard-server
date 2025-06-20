import { Fret } from "../../src/models/fret";
import { String } from "../../src/models/string";
import * as utils from "../../src/utils/string.utils";
import * as fretUtils from "../../src/utils/fret.utils";
import * as notesUtils from "../../src/utils/note.utils";
import exp from "constants";

describe("initailizeString function", () => {
  it("should initailize String instance with correct process and return type", () => {
    const spy = jest.spyOn(utils, "updateNumFrets");

    const string = utils.initailizeString("C#4", 12);

    expect(spy).toHaveBeenCalledWith(string, 12);
    expect(string).toBeInstanceOf(String);
    expect(string.openString).toBe("C#4");
  });
  it("should throw errors or not", () => {
    expect(() => utils.initailizeString("G#9", 1)).not.toThrow();
    expect(() => utils.initailizeString("G#9", 2)).toThrow(
      new Error("Invalid string configuration")
    );
    expect(() => utils.initailizeString("D9", 7)).not.toThrow();
    expect(() => utils.initailizeString("D9", 8)).toThrow(
      new Error("Invalid string configuration")
    );
    expect(() => utils.initailizeString("C4", 120)).toThrow(
      new Error("Invalid string configuration")
    );
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
    expect(gottenFret).toBe(string.frets[4]);
  });
});

describe("updateOpenString function", () => {
  it("should update properties correctly", () => {
    const updateMIDINoteNumberSpy = jest.spyOn(
      fretUtils,
      "updateMIDINoteNumber"
    );

    const string = new String();
    string.frets = Array.from({ length: 5 }, () => new Fret());
    string.openString = "C4";
    const mockPitchClassBitmap = Array.from({ length: 12 }, () => false);

    utils.updateOpenString(string, "D#2");

    expect(string.openString).toBe("D#2");
    expect(updateMIDINoteNumberSpy).toHaveBeenCalledTimes(5);
    for (let index = 0; index < 5; index++) {
      expect(updateMIDINoteNumberSpy).toHaveBeenNthCalledWith(
        index + 1,
        string.frets[index],
        39 + index
      );
    }

    updateMIDINoteNumberSpy.mockRestore();
  });
  it("should throw errors or not", () => {
    const string = new String();

    string.frets = Array.from({ length: 5 }, () => new Fret());
    string.openString = "C4";

    expect(() => utils.updateOpenString(string, "F9")).toThrow(
      new Error("Invalid string configuration")
    );
    expect(() => utils.updateOpenString(string, "E9")).not.toThrow();
  });
});

describe("updateNumFrets function", () => {
  it("should throw errors or not", () => {
    const string = new String();
    string.frets = Array.from({ length: 5 }, () => new Fret());
    string.openString = "C9";

    expect(() => utils.updateNumFrets(string, 0)).toThrow(
      new Error(
        "Number of frets must be larger than 0 ( including open string )"
      )
    );
    expect(() => utils.updateNumFrets(string, 10)).toThrow(
      new Error("Invalid string configuration")
    );
    expect(() => utils.updateNumFrets(string, 9)).not.toThrow();
  });

  it("should throw errors", () => {
    expect(() => utils.updateNumFrets(new String(), 0)).toThrow(
      new Error(
        "Number of frets must be larger than 0 ( including open string )"
      )
    );
    expect(() => utils.updateNumFrets(new String(), -1)).toThrow(
      new Error(
        "Number of frets must be larger than 0 ( including open string )"
      )
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
