import { Fret } from "../../src/models/fret";

describe("Fret class", () => {
  let fret: Fret;

  beforeEach(() => {
    fret = new Fret(0);
  });

  it("should return the correct JSON when the fret is pressed", () => {
    fret.press();
    const json = fret.toJSON();

    expect(json).toEqual({
      noteCode: 0,
      isPressed: true,
    });
  });

  it("should create a fret instance with the correct initial state", () => {
    expect(fret.noteCode).toEqual(0);
    expect(fret.isPressed).toEqual(false);
  });

  it("should change isPressed to true when press() is called", () => {
    fret.press();
    expect(fret.isPressed).toEqual(true);
  });

  it("should change isPressed to false when release() is called", () => {
    fret.press();
    fret.release();
    expect(fret.isPressed).toEqual(false);
  });
});
