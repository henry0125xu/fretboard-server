export type Note = "C" | "D" | "E" | "F" | "G" | "A" | "B";

export type Accidental = "" | "#" | "b" | "##" | "bb";

export type Octave = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type BasicNote = `${Accidental}${Note}`;

export type FullNote = `${BasicNote}${Octave}`;

export const BASIC_NOTE_REGEX: RegExp = /^([#b]{0,2})([A-G])$/;

export const FULL_NOTE_REGEX: RegExp = /^([#b]{0,2})([A-G])([0-8])$/;
