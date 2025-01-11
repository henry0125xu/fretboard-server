import {
  Note,
  Accidental,
  Octave,
  FullNote,
  EnharmonicBasicNotes,
  EnharmonicFullNotes,
  MIDI_LO,
  MIDI_HI,
  MIDI_C4,
  FULL_NOTE_REGEX,
  BasicNote,
  BASIC_NOTE_REGEX,
} from "../models/note";

export const mapFullNoteToMIDINoteNumber = (fullNote: FullNote): number => {
  const match = fullNote.match(FULL_NOTE_REGEX);
  if (!match) {
    throw new Error(`Invalid format: ${fullNote}`);
  }

  const [, baseNote, accidental, octave] = match;

  const baseValue = baseValues[baseNote as Note];
  const accidentalOffset = accidentalOffsets[accidental as Accidental];
  const octaveOffset = getOctaveOffset(Number(octave) as Octave);

  const midiNoteNumber = MIDI_C4 + baseValue + octaveOffset + accidentalOffset;

  if (midiNoteNumber < MIDI_LO || midiNoteNumber > MIDI_HI) {
    throw new Error("The full note is undefined under mapped MIDI note number");
  }
  return midiNoteNumber;
};

export const mapFullNoteToPitchClass = (fullNote: FullNote): number => {
  return exports.mapMIDINoteNumberToPitchClass(
    exports.mapFullNoteToMIDINoteNumber(fullNote)
  );
};

export const mapBasicNoteToPitchClass = (basicNote: BasicNote): number => {
  const match = basicNote.match(BASIC_NOTE_REGEX);
  if (!match) {
    throw new Error(`Invalid format: ${basicNote}`);
  }
  const [, baseNote, accidental] = match;
  const baseValue = baseValues[baseNote as Note];
  const accidentalOffset = accidentalOffsets[accidental as Accidental];
  return (baseValue + accidentalOffset + 12) % 12;
};

export const mapMIDINoteNumberToPitchClass = (
  midiNoteNumber: number
): number => {
  return midiNoteNumber % 12;
};

export const mapMIDINoteNumberToEnharmonicFullNotes = (
  midiNoteNumber: number
): EnharmonicFullNotes => {
  const octave = toOctave(midiNoteNumber);
  const pitchClass = exports.mapMIDINoteNumberToPitchClass(midiNoteNumber);
  const basicNotes = pitchClassToEnharmonicBasicNotes[pitchClass];
  return toEnharmonicFullNotes(basicNotes, octave);
};

export const mapMIDINoteNumberToFrequency = (
  midiNoteNumber: number,
  decimalPlaces: number = 2
): number => {
  const frequency = 440 * Math.pow(2, (midiNoteNumber - 69) / 12);
  return parseFloat(frequency.toFixed(decimalPlaces));
};

export const getPitchClassBitmap = (basicNotes: BasicNote[]): boolean[] => {
  const pitchClassBitmap = Array.from({ length: 12 }, () => false);
  basicNotes.forEach((basicNote) => {
    const pitchClass = mapBasicNoteToPitchClass(basicNote);
    pitchClassBitmap[pitchClass] = true;
  });
  return pitchClassBitmap;
};

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

const getOctaveOffset = (octave: Octave): number => {
  return (octave - 4) * 12;
};

const pitchClassToEnharmonicBasicNotes: Record<number, EnharmonicBasicNotes> = {
  0: ["C"],
  1: ["C#", "Db"],
  2: ["D"],
  3: ["D#", "Eb"],
  4: ["E"],
  5: ["F"],
  6: ["F#", "Gb"],
  7: ["G"],
  8: ["G#", "Ab"],
  9: ["A"],
  10: ["A#", "Bb"],
  11: ["B"],
};

const toEnharmonicFullNotes = (
  notes: EnharmonicBasicNotes,
  octave: Octave
): EnharmonicFullNotes => {
  return Array.from(
    { length: notes.length },
    (_, index) => `${notes[index]}${octave}`
  ) as EnharmonicFullNotes;
};

const toOctave = (midiNoteNumber: number): Octave => {
  return (((midiNoteNumber - MIDI_C4 + 12 * 4) / 12) | 0) as Octave;
};
