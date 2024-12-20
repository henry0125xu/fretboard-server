import { String } from "../../src/models/string";
import { Fret } from "../../src/models/fret";
import { FullNote } from "../../src/models/note";

describe("String class", () => {
  const openString: FullNote = "E4";
  const numFrets = 5;
  let string: String;
  beforeEach(() => {
    string = new String(openString, numFrets);
  });

  it("should create a string instance with the correct initial state", () => {
    expect(string.openString).toEqual(openString);
    expect(string.numFrets).toEqual(numFrets);
    expect(string.frets).toEqual(
      Array.from({ length: numFrets }, (_, _index) => new Fret())
    );
  });

  it("should return the correct JSON", () => {
    const json = string.toJSON();

    expect(json).toEqual({
      openString: string.openString,
      numFrets: string.numFrets,
      frets: string.frets,
    });
  });
});
