import { Fret } from "../../src/models/fret";

describe("Fret class", () => {
  let fret: Fret;
  beforeEach(() => {
    fret = new Fret();
  });

  it("should create a fret instance with the correct initial state", () => {
    expect(fret.pitchClass).toEqual(0);
    expect(fret.midiNoteNumber).toEqual(60);
    expect(fret.enharmonicNotes).toEqual(["C4"]);
    expect(fret.isPressed).toEqual(false);
  });

  it("should return the correct JSON", () => {
    const json = fret.toJSON();

    expect(json).toEqual({
      pitchClass: fret.pitchClass,
      midiNoteNumber: fret.midiNoteNumber,
      enharmonicNotes: fret.enharmonicNotes,
      isPressed: fret.isPressed,
    });
  });
});
