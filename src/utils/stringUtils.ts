import { String } from "../models/string";
import { classifyBy12Tone } from "../utils/noteUtils";

export function setFretClassesForString(string: String) {
  for (let fretIndex = 0; fretIndex < string.numFrets; fretIndex++) {
    const fret = string.frets[fretIndex];
    fret.class = (classifyBy12Tone(string.openString) + fretIndex) % 12;
  }
}
