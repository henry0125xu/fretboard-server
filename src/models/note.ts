export type Note = "C" | "D" | "E" | "F" | "G" | "A" | "B";
export type Accidental = "" | "#" | "b" | "##" | "bb";
export type Octave = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type BasicNote = `${Note}${Accidental}`;
export type FullNote = `${BasicNote}${Octave}`;

export type EnharmonicBasicNotes = BasicNote[];
export type EnharmonicFullNotes = FullNote[];

export const MIDI_C4: number = 60;
export const MIDI_LO: number = 0;
export const MIDI_HI: number = 128;

const BASE_NOTE_PATTERN = `([A-G])([#b]{0,2})`;
export const BASIC_NOTE_REGEX: RegExp = new RegExp(`^${BASE_NOTE_PATTERN}$`);
export const FULL_NOTE_REGEX: RegExp = new RegExp(
  `^${BASE_NOTE_PATTERN}([0-9])$`
);
