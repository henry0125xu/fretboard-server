import { Fret } from "../../src/models/fret";

describe("Fret class", () => {
  let fret: Fret;
  beforeEach(() => {
    fret = new Fret();
  });

  it("should create a fret instance with the correct initial state", () => {
    expect(fret.class).toEqual(0);
    expect(fret.isPressed).toEqual(false);
  });

  it("should return the correct JSON", () => {
    const json = fret.toJSON();

    expect(json).toEqual({
      class: fret.class,
      isPressed: fret.isPressed,
    });
  });
});
