import { FullNote } from "./note";
import { String } from "./string";

export class Fretboard {
  public strings: String[] = [];
}

export const DEFAULT_OPEN_STRINGS: FullNote[] = [
  "E4",
  "B3",
  "G3",
  "D3",
  "A2",
  "E2",
];

export const DEFAULT_NUM_FRETS: number = 22;
