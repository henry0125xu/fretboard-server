import {
  BasicNote,
  FullNote,
  BASIC_NOTE_REGEX,
  FULL_NOTE_REGEX,
} from "../../src/models/note";

describe("Note types", () => {
  it("should correctly construct notes", () => {
    const note1: BasicNote = "B";
    const note2: BasicNote = "##A";
    const note3: FullNote = "bbC3";
    const note4: FullNote = "F4";

    expect(note1).toBe("B");
    expect(note2).toBe("##A");
    expect(note3).toBe("bbC3");
    expect(note4).toBe("F4");
  });
});

describe("Regex Tests", () => {
  it("should match valid notes", () => {
    expect("C").toMatch(BASIC_NOTE_REGEX);
    expect("#D").toMatch(BASIC_NOTE_REGEX);
    expect("bA").toMatch(BASIC_NOTE_REGEX);
    expect("##F").toMatch(BASIC_NOTE_REGEX);
    expect("G7").toMatch(FULL_NOTE_REGEX);
    expect("#C4").toMatch(FULL_NOTE_REGEX);
    expect("bB0").toMatch(FULL_NOTE_REGEX);
    expect("##D2").toMatch(FULL_NOTE_REGEX);
  });

  it("should not match invalid notes", () => {
    expect("H").not.toMatch(BASIC_NOTE_REGEX);
    expect("X").not.toMatch(BASIC_NOTE_REGEX);
    expect("#Cb").not.toMatch(BASIC_NOTE_REGEX);
    expect("C9").not.toMatch(FULL_NOTE_REGEX);
    expect("H4").not.toMatch(FULL_NOTE_REGEX);
    expect("##C7b").not.toMatch(FULL_NOTE_REGEX);
  });
});
