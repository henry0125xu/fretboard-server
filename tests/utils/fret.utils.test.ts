import { Fret } from "../../src/models/fret";
import { FullNote } from "../../src/models/note";
import * as utils from "../../src/utils/fret.utils";
import * as noteUtils from "../../src/utils/note.utils";

describe("initializeFret function", () => {
  it("should initailize Fret instance with correct process and return type", () => {
    const spy = jest.spyOn(utils, "updateMIDINoteNumber");
    const fret = utils.initializeFret(75);
    expect(spy).toHaveBeenCalledWith(fret, 75);
    expect(fret).toBeInstanceOf(Fret);
  });
});

describe("updateMIDINoteNumber function", () => {
  it("should update MIDI note number with correct process", () => {
    jest.spyOn(noteUtils, "mapMIDINoteNumberToPitchClass").mockReturnValue(5);
    jest
      .spyOn(noteUtils, "mapMIDINoteNumberToEnharmonicFullNotes")
      .mockReturnValue(["F4"]);
    jest
      .spyOn(noteUtils, "mapMIDINoteNumberToFrequency")
      .mockReturnValue(349.23);

    const fret = new Fret();
    utils.updateMIDINoteNumber(fret, 65);

    expect(fret.midiNoteNumber).toBe(65);
    expect(fret.pitchClass).toBe(5);
    expect(fret.enharmonicNotes).toEqual(["F4" as FullNote]);
    expect(fret.frequency).toBe(349.23);
  });
  it("should throw errors", () => {
    expect(() => utils.updateMIDINoteNumber(new Fret(), -1)).toThrow(
      new Error("Invalid MIDI note number")
    );
    expect(() => utils.updateMIDINoteNumber(new Fret(), 130)).toThrow(
      new Error("Invalid MIDI note number")
    );
  });
});
