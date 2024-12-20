import { FullNote } from "../../src/models/note";
import { String } from "../../src/models/string";
import { setFretClassesForString } from "../../src/utils/stringUtils";

describe("setFretClassesForString function", () => {
  it("should set note class for each fret correctly", () => {
    const openString: FullNote = "##E2";
    const numFrets = 15;
    const string: String = new String(openString, numFrets);
    setFretClassesForString(string);

    for (let fretIndex = 0; fretIndex < numFrets; fretIndex++) {
      expect(string.frets[fretIndex].class).toBe((6 + fretIndex) % 12);
    }
  });
});
