import { FullNote } from "../../src/models/note";
import { String } from "../../src/models/string";
import { setFretClasses, classifyBy12Tone } from "../../src/utils/stringUtils";

describe("setFretClasses function", () => {
  it("should set note class for each fret correctly", () => {
    const openString: FullNote = "##E2";
    const numFrets = 15;
    const string: String = new String(openString, numFrets);
    setFretClasses(string);

    for (let fretIndex = 0; fretIndex < numFrets; fretIndex++) {
      expect(string.frets[fretIndex].class).toBe((6 + fretIndex) % 12);
    }
  });
});

describe("classifyBy12Tone function", () => {
  it("should return correct note class for given inputs", () => {
    expect(classifyBy12Tone("C4")).toBe(0);
    expect(classifyBy12Tone("#D5")).toBe(3);
    expect(classifyBy12Tone("bA3")).toBe(8);
    expect(classifyBy12Tone("##E2")).toBe(6);
  });
});
