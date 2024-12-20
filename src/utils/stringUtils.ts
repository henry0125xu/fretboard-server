import { String } from "../models/string";
import { FullNote } from "../models/note";
import { mapToNoteCode } from "./noteUtils";

export function setFretClasses(string: String) {
  for (let fretIndex = 0; fretIndex < string.numFrets; fretIndex++) {
    const fret = string.frets[fretIndex];
    fret.class = (classifyBy12Tone(string.openString) + fretIndex) % 12;
  }
}

export function classifyBy12Tone(fullNote: FullNote): number {
  return ((mapToNoteCode(fullNote) % 12) + 12) % 12;
}
