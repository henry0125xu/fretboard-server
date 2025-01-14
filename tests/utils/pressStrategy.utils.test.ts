import {
  initializePressStrategy,
  press,
} from "../../src/utils/pressStrategy.utils";
import {
  NonePressStrategy,
  PitchClassPressStrategy,
} from "../../src/models/pressStrategy";
import { Fretboard } from "../../src/models/fretboard";
import { Fret } from "../../src/models/fret";
import { String } from "../../src/models/string";

describe("initializePressStrategy", () => {
  it("should return a NonePressStrategy instance when type is 'none'", () => {
    const pressStrategy = initializePressStrategy("none");
    expect(pressStrategy).toBeInstanceOf(NonePressStrategy);
  });

  it("should return a PitchClassPressStrategy instance when type is 'pitch-class'", () => {
    const pressStrategy = initializePressStrategy("pitch-class");
    expect(pressStrategy).toBeInstanceOf(PitchClassPressStrategy);
  });

  it("should throw an error when type is not 'none' or 'pitch-class'", () => {
    expect(() => initializePressStrategy("invalid" as any)).toThrow(
      new Error("Not implemented yet")
    );
  });
});

describe("press", () => {
  it("should release all frets when pressStrategy type is 'none'", () => {
    const fretboard = newMockFretboard();
    const pressStrategy = new NonePressStrategy();
    press(fretboard, pressStrategy);
    fretboard.strings.forEach((string) =>
      string.frets.forEach((fret) => expect(fret.isPressed).toBe(false))
    );
  });
  it("should press frets according to pressStrategy state when pressStrategy type is 'pitch-class'", () => {
    const fretboard = newMockFretboard();
    const pressStrategy = new PitchClassPressStrategy();
    pressStrategy.state[0] = true;
    pressStrategy.state[1] = false;
    pressStrategy.state[2] = false;
    pressStrategy.state[3] = false;
    pressStrategy.state[4] = true;
    pressStrategy.state[5] = false;
    pressStrategy.state[6] = false;
    pressStrategy.state[7] = true;
    pressStrategy.state[8] = false;
    pressStrategy.state[9] = false;
    pressStrategy.state[10] = false;
    pressStrategy.state[11] = false;

    press(fretboard, pressStrategy);

    expect(fretboard.strings[0].frets[0].isPressed).toBe(true);
    expect(fretboard.strings[0].frets[1].isPressed).toBe(false);
    expect(fretboard.strings[0].frets[2].isPressed).toBe(false);
    expect(fretboard.strings[0].frets[3].isPressed).toBe(true);
    expect(fretboard.strings[1].frets[0].isPressed).toBe(true);
    expect(fretboard.strings[1].frets[1].isPressed).toBe(false);
    expect(fretboard.strings[1].frets[2].isPressed).toBe(false);
    expect(fretboard.strings[1].frets[3].isPressed).toBe(false);
    expect(fretboard.strings[2].frets[0].isPressed).toBe(false);
    expect(fretboard.strings[2].frets[1].isPressed).toBe(false);
    expect(fretboard.strings[2].frets[2].isPressed).toBe(true);
    expect(fretboard.strings[2].frets[3].isPressed).toBe(false);
  });
});

const newMockFretboard = (): Fretboard => {
  const fretboard = new Fretboard();
  fretboard.strings = Array.from({ length: 3 }, () => new String());
  fretboard.strings.forEach((string) => {
    string.frets = Array.from({ length: 4 }, () => new Fret());
  });

  fretboard.strings[0].frets[0].pitchClass = 4;
  fretboard.strings[0].frets[1].pitchClass = 5;
  fretboard.strings[0].frets[2].pitchClass = 6;
  fretboard.strings[0].frets[3].pitchClass = 7;
  fretboard.strings[1].frets[0].pitchClass = 0;
  fretboard.strings[1].frets[1].pitchClass = 1;
  fretboard.strings[1].frets[2].pitchClass = 2;
  fretboard.strings[1].frets[3].pitchClass = 3;
  fretboard.strings[2].frets[0].pitchClass = 10;
  fretboard.strings[2].frets[1].pitchClass = 11;
  fretboard.strings[2].frets[2].pitchClass = 0;
  fretboard.strings[2].frets[3].pitchClass = 1;
  return fretboard;
};
