import { mapToNoteCode } from "../../src/utils/noteUtils";

describe("mapToNoteCode function", () => {
  it("should return correct note code for valid FullNote", () => {
    expect(mapToNoteCode("C4")).toBe(0);
    expect(mapToNoteCode("#D5")).toBe(3 + 12);
    expect(mapToNoteCode("bA3")).toBe(8 - 12);
    expect(mapToNoteCode("##E2")).toBe(6 - 12 * 2);
  });
});
