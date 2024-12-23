import { Fret } from "../models/fret";
import { String } from "../models/string";
import { mapFullNoteToMIDINoteNumber } from "../utils/noteUtils";

export function setFretMIDINoteNumbers(string: String) {
  for (let fretIndex = 0; fretIndex < string.numFrets; fretIndex++) {
    const fret = string.frets[fretIndex];
    fret.midiNoteNumber =
      mapFullNoteToMIDINoteNumber(string.openString) + fretIndex;
  }
}
