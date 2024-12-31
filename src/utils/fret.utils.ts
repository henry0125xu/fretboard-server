import { MIDI_LO, MIDI_HI } from "../models/note";
import { Fret } from "../models/fret";
import {
  mapMIDINoteNumberToPitchClass,
  mapMIDINoteNumberToEnharmonicFullNotes,
  mapMIDINoteNumberToFrequency,
} from "./note.utils";

export function initializeFret(midiNoteNumber: number): Fret {
  const fret = new Fret();
  exports.updateMIDINoteNumber(fret, midiNoteNumber);
  return fret;
}

export function updateMIDINoteNumber(fret: Fret, midiNoteNumber: number): void {
  if (!isValidMIDINoteNumber(midiNoteNumber)) {
    throw new Error("Invalid MIDI note number");
  }
  fret.midiNoteNumber = midiNoteNumber;
  fret.pitchClass = mapMIDINoteNumberToPitchClass(midiNoteNumber);
  fret.enharmonicNotes = mapMIDINoteNumberToEnharmonicFullNotes(midiNoteNumber);
  fret.frequency = mapMIDINoteNumberToFrequency(midiNoteNumber);
}

function isValidMIDINoteNumber(midiNoteNumber: number): boolean {
  return MIDI_LO <= midiNoteNumber && midiNoteNumber <= MIDI_HI;
}
