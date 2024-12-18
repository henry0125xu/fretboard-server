import { Note, Accidental, Octave, FullNote } from "../models/note";

const fullNoteRegex: RegExp = /^([#b]{0,2})([A-G])([0-8])$/;

const baseValues: Record<Note, number> = {
  [Note.C]: 0,
  [Note.D]: 2,
  [Note.E]: 4,
  [Note.F]: 5,
  [Note.G]: 7,
  [Note.A]: 9,
  [Note.B]: 11,
};

const accidentalOffsets: Record<Accidental, number> = {
  [Accidental.Natural]: 0,
  [Accidental.Sharp]: 1,
  [Accidental.Flat]: -1,
  [Accidental.DoubleSharp]: 2,
  [Accidental.DoubleFlat]: -2,
};

function getOctaveOffset(octave: Octave): number {
  return (octave - Octave.Octave4) * 12;
}

export function mapToFullNote(
  note: Note,
  accidental: Accidental = Accidental.Natural,
  octave: Octave = Octave.Octave4
): FullNote {
  return `${note}${accidental}${octave}` as FullNote;
}

export function mapToNoteCode(note: FullNote): number {
  const match = note.match(fullNoteRegex);

  if (!match) {
    throw new Error(`Invalid note format: ${note}`);
  }

  const [, accidental, baseNote, octave] = match;

  const baseValue = baseValues[baseNote as Note];
  const accidentalOffset = accidentalOffsets[accidental as Accidental];
  const octaveOffset = getOctaveOffset(Number(octave) as Octave);

  return ((baseValue + accidentalOffset + 12) % 12) + octaveOffset;
}
