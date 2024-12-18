import { ChordService } from "../../src/services/fretNotes.service";
import { Note } from "../../src/models/note";
import { Chord } from "../../src/models/chord";

const chordService = new ChordService();

describe("Test Chord Service", () => {
  it("should return notes of C chord", () => {
    const notes: Note[] = chordService.getChordNotes("test C");
    expect(notes).toEqual([new Note("C"), new Note("E"), new Note("G")]);
  });
});
