export enum Note {
  C = "C",
  D = "D",
  E = "E",
  F = "F",
  G = "G",
  A = "A",
  B = "B",
}

export enum Accidental {
  Natural = "",
  Sharp = "#",
  Flat = "b",
  DoubleSharp = "##",
  DoubleFlat = "bb",
}

export enum Octave {
  Octave0 = 0,
  Octave1 = 1,
  Octave2 = 2,
  Octave3 = 3,
  Octave4 = 4,
  Octave5 = 5,
  Octave6 = 6,
  Octave7 = 7,
  Octave8 = 8,
}

export type FullNote = `${Accidental}${Note}${Octave}`;
