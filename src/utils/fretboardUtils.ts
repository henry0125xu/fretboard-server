import { FullNote } from "../models/note";
import {
  Fretboard,
  DEFAULT_OPEN_STRINGS,
  DEFAULT_NUM_FRETS,
} from "../models/fretboard";
import { initailizeString, getFret } from "./stringUtils";

export function initializeFretboard(
  openStrings: FullNote[] = DEFAULT_OPEN_STRINGS,
  numFrets: number = DEFAULT_NUM_FRETS
): Fretboard {
  if (openStrings.length == 0) {
    throw new Error("Number of strings must be larger than 0");
  }
  if (numFrets <= 0) {
    throw new Error("Number of frets must be larger than 0");
  }

  const fretboard = new Fretboard();
  fretboard.strings = openStrings.map((openString) =>
    initailizeString(openString, numFrets)
  );
  return fretboard;
}

export function pressFret(
  fretboard: Fretboard,
  stringIndex: number,
  fretIndex: number
) {
  const string = exports.getString(fretboard, stringIndex);
  const fret = getFret(string, fretIndex);
  fret.isPressed = true;
}

export function releaseFret(
  fretboard: Fretboard,
  stringIndex: number,
  fretIndex: number
): void {
  const string = exports.getString(fretboard, stringIndex);
  const fret = getFret(string, fretIndex);
  fret.isPressed = false;
}

export function isFretPressed(
  fretboard: Fretboard,
  stringIndex: number,
  fretIndex: number
): boolean {
  const string = exports.getString(fretboard, stringIndex);
  const fret = getFret(string, fretIndex);
  return fret.isPressed;
}

export function getString(fretboard: Fretboard, stringIndex: number) {
  if (!isValidStringIndex(fretboard, stringIndex)) {
    throw new Error("Invalid string index");
  }
  return fretboard.strings[stringIndex];
}

function isValidStringIndex(
  fretboard: Fretboard,
  stringIndex: number
): boolean {
  return stringIndex >= 0 && stringIndex < fretboard.strings.length;
}
