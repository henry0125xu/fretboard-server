import { mapToFullNote, mapToNoteCode } from "../../src/utils/noteUtils";

describe("mapToFullNote function", () => {
  it("should return correct FullNote for given inputs", () => {
    expect(mapToFullNote("C", "", 4)).toBe("C4");
    expect(mapToFullNote("D", "#", 5)).toBe("#D5");
    expect(mapToFullNote("A", "b", 3)).toBe("bA3");
    expect(mapToFullNote("E", "##", 2)).toBe("##E2");
  });
});

describe("mapToNoteCode function", () => {
  it("should return correct note code for valid FullNote", () => {
    expect(mapToNoteCode("C4")).toBe(0);
    expect(mapToNoteCode("#D5")).toBe(3 + 12);
    expect(mapToNoteCode("bA3")).toBe(8 - 12);
    expect(mapToNoteCode("##E2")).toBe(6 - 12 * 2);
  });
});
