import { Fret } from "../../src/models/fret";
import * as utils from "../../src/utils/fret.utils";

describe("initializeFret function", () => {
  it("should initailize Fret instance with correct process and return type", () => {
    const spy = jest.spyOn(utils, "updateMIDINoteNumber");
    const fret = utils.initializeFret(75);
    expect(spy).toHaveBeenCalledWith(fret, 75);
    expect(fret).toBeInstanceOf(Fret);
  });
});

describe("updateMIDINoteNumber function", () => {
  it("should update properties correctly", () => {
    const actual = new Fret();
    utils.updateMIDINoteNumber(actual, 60);
    const expected = new Fret();
    expected.midiNoteNumber = 60;
    expected.pitchClass = 0;
    expected.enharmonicNotes = ["C4"];
    expected.isPressed = false;
    expect(actual).toEqual(expected);
  });
  it("should update properties correctly", () => {
    const actual = new Fret();
    utils.updateMIDINoteNumber(actual, 75);
    const expected = new Fret();
    expected.midiNoteNumber = 75;
    expected.pitchClass = 3;
    expected.enharmonicNotes = ["D#5", "Eb5"];
    expected.isPressed = false;
    expect(actual).toEqual(expected);
  });
  it("should update properties correctly", () => {
    const actual = new Fret();
    utils.updateMIDINoteNumber(actual, 35);
    const expected = new Fret();
    expected.midiNoteNumber = 35;
    expected.pitchClass = 11;
    expected.enharmonicNotes = ["B1"];
    expected.isPressed = false;
    expect(actual).toEqual(expected);
  });
  it("should update properties correctly", () => {
    const actual = new Fret();
    utils.updateMIDINoteNumber(actual, 128);
    const expected = new Fret();
    expected.midiNoteNumber = 128;
    expected.pitchClass = 8;
    expected.enharmonicNotes = ["G#9", "Ab9"];
    expected.isPressed = false;
    expect(actual).toEqual(expected);
  });
  it("should update properties correctly", () => {
    const actual = new Fret();
    utils.updateMIDINoteNumber(actual, 21);
    const expected = new Fret();
    expected.midiNoteNumber = 21;
    expected.pitchClass = 9;
    expected.enharmonicNotes = ["A0"];
    expected.isPressed = false;
    expect(actual).toEqual(expected);
  });
  it("should throw errors", () => {
    expect(() => utils.updateMIDINoteNumber(new Fret(), 12)).toThrow(
      new Error("Invalid MIDI note number")
    );
  });
  it("should throw errors", () => {
    expect(() => utils.updateMIDINoteNumber(new Fret(), 130)).toThrow(
      new Error("Invalid MIDI note number")
    );
  });
});
