export type Note = "C" | "D" | "E" | "F" | "G" | "A" | "B";

export type Accidental = "" | "#" | "b" | "##" | "bb";

export type Octave = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type BasicNote = `${Note}${Accidental}`;

export type FullNote = `${BasicNote}${Octave}`;

export type EnharmonicBasicNote = BasicNote[];

export type EnharmonicFullNote = FullNote[];

export const BASIC_NOTE_REGEX: RegExp = /^([A-G])([#b]{0,2})$/;

export const FULL_NOTE_REGEX: RegExp = /^([A-G])([#b]{0,2})([0-8])$/;
