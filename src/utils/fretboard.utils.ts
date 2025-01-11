import { FullNote } from "../models/note";
import {
  Fretboard,
  DEFAULT_OPEN_STRINGS,
  DEFAULT_NUM_FRETS,
} from "../models/fretboard";
import { String } from "../models/string";
import { initailizeString } from "./string.utils";
import { Fret } from "../models/fret";

export const initializeFretboard = (
  openStrings: FullNote[] = DEFAULT_OPEN_STRINGS,
  numFrets: number = DEFAULT_NUM_FRETS
): Fretboard => {
  if (openStrings.length == 0) {
    throw new Error("Number of strings must be larger than 0");
  }
  if (numFrets <= 0) {
    throw new Error(
      "Number of frets must be larger than 0 ( including open string )"
    );
  }

  const fretboard = new Fretboard();
  fretboard.strings = openStrings.map((openString) =>
    initailizeString(openString, numFrets)
  );
  return fretboard;
};

export const getString = (
  fretboard: Fretboard,
  stringIndex: number
): String => {
  if (!isValidStringIndex(fretboard, stringIndex)) {
    throw new Error("Invalid string index");
  }
  return fretboard.strings[stringIndex];
};

export const deleteString = (
  fretboard: Fretboard,
  stringIndex: number
): void => {
  if (!isValidStringIndex(fretboard, stringIndex)) {
    throw new Error("Invalid string index");
  }
  if (fretboard.strings.length == 1) {
    throw new Error("Number of strings must be larger than 0");
  }
  fretboard.strings.splice(stringIndex, 1);
};

export const insertString = (
  fretboard: Fretboard,
  string: String,
  stringIndex: number
): void => {
  if (
    !isValidStringIndex(fretboard, stringIndex) &&
    stringIndex != fretboard.strings.length
  ) {
    throw new Error("Invalid string index");
  }
  fretboard.strings.splice(stringIndex, 0, string);
};

export const forEachFret = (
  fretboard: Fretboard,
  callback: (fret: Fret) => void
): void => {
  fretboard.strings.forEach((string) => {
    string.frets.forEach((fret) => callback(fret));
  });
};

const isValidStringIndex = (
  fretboard: Fretboard,
  stringIndex: number
): boolean => {
  return stringIndex >= 0 && stringIndex < fretboard.strings.length;
};
