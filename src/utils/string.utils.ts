import { FullNote, MIDI_LO, MIDI_HI } from "../models/note";
import { Fret } from "../models/fret";
import { String } from "../models/string";
import { mapFullNoteToMIDINoteNumber } from "./note.utils";
import { updateMIDINoteNumber } from "./fret.utils";

export function initailizeString(
  openString: FullNote,
  numFrets: number
): String {
  if (!isValidString(openString, numFrets)) {
    throw new Error("Invalid string configuration");
  }
  const string = new String();
  string.openString = openString;
  exports.updateNumFrets(string, numFrets);
  return string;
}

export function getFret(string: String, fretIndex: number): Fret {
  if (!isValidFretIndex(string, fretIndex)) {
    throw new Error("Invalid string index");
  }
  return string.frets[fretIndex];
}

export function updateOpenString(string: String, openString: FullNote): void {
  if (!isValidString(openString, string.frets.length)) {
    throw new Error("Invalid string configuration");
  }
  string.openString = openString;
  for (const [fretIndex, fret] of string.frets.entries()) {
    const midiNoteNumber =
      mapFullNoteToMIDINoteNumber(string.openString) + fretIndex;
    updateMIDINoteNumber(fret, midiNoteNumber);
  }
}

export function updateNumFrets(string: String, numFrets: number): void {
  if (!isValidString(string.openString, numFrets)) {
    throw new Error("Invalid string configuration");
  }
  const diff = numFrets - string.frets.length;
  let opCount = Math.abs(diff);
  if (diff < 0) {
    popFrets(string, opCount);
  } else {
    pushFrets(string, opCount);
  }
}

function isValidString(openString: FullNote, numFrets: number): boolean {
  if (numFrets <= 0) {
    throw new Error(
      "Number of frets must be larger than 0 ( including open string )"
    );
  }

  const midiNoteNumber = mapFullNoteToMIDINoteNumber(openString);

  const lo = midiNoteNumber;
  const hi = midiNoteNumber + numFrets - 1;

  return lo >= MIDI_LO && hi <= MIDI_HI;
}

function pushFrets(string: String, numToPushed: number): void {
  const frets = string.frets;
  const start = frets.length;
  for (let fretIndex = start; fretIndex < start + numToPushed; fretIndex++) {
    const fret = new Fret();
    const midiNoteNumber =
      mapFullNoteToMIDINoteNumber(string.openString) + fretIndex;
    updateMIDINoteNumber(fret, midiNoteNumber);
    frets.push(fret);
  }
}

function popFrets(string: String, numToPopped: number): void {
  while (numToPopped--) {
    string.frets.pop();
  }
}

function isValidFretIndex(string: String, fretIndex: number): boolean {
  return fretIndex >= 0 && fretIndex < string.frets.length;
}
