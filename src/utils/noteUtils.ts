import {
  Note,
  Accidental,
  Octave,
  FullNote,
  FULL_NOTE_REGEX,
} from "../models/note";

export function mapToNoteCode(fullNote: FullNote): number {
  const match = fullNote.match(FULL_NOTE_REGEX);
  if (!match) {
    throw new Error(`Invalid note format: ${fullNote}`);
  }

  const [, accidental, baseNote, octave] = match;

  const baseValue = baseValues[baseNote as Note];
  const accidentalOffset = accidentalOffsets[accidental as Accidental];
  const octaveOffset = getOctaveOffset(Number(octave) as Octave);

  return ((baseValue + accidentalOffset + 12) % 12) + octaveOffset;
}

export function classifyBy12Tone(fullNote: FullNote): number {
  return ((mapToNoteCode(fullNote) % 12) + 12) % 12;
}

const baseValues: Record<Note, number> = {
  ["C"]: 0,
  ["D"]: 2,
  ["E"]: 4,
  ["F"]: 5,
  ["G"]: 7,
  ["A"]: 9,
  ["B"]: 11,
};

const accidentalOffsets: Record<Accidental, number> = {
  [""]: 0,
  ["#"]: 1,
  ["b"]: -1,
  ["##"]: 2,
  ["bb"]: -2,
};

function getOctaveOffset(octave: Octave): number {
  return (octave - 4) * 12;
}
