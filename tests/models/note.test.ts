import { FullNote } from "../../src/models/note";

describe("FullNote type", () => {
  it("should correctly construct FullNote", () => {
    const note1: FullNote = "C4";
    const note2: FullNote = "#D5";
    const note3: FullNote = "bbB3";
    const note4: FullNote = "F4";

    expect(note1).toBe("C4");
    expect(note2).toBe("#D5");
    expect(note3).toBe("bbB3");
    expect(note4).toBe("F4");
  });
});
