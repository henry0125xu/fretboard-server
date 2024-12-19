import { String } from "./string";
import { FullNote } from "./note";

export class Fretboard {
  public readonly numStrings: number;
  public readonly numFrets: number;
  public readonly strings: String[];
  private readonly openStrings: FullNote[];

  public constructor(openStrings: FullNote[], numFrets: number) {
    this.numStrings = openStrings.length;
    this.openStrings = openStrings;
    this.numFrets = numFrets;
    this.strings = Array.from(
      { length: this.numStrings },
      (_, stringIndex) =>
        new String(this.openStrings[stringIndex], this.numFrets)
    );
  }

  public press(stringIndex: number, fretIndex: number): void {
    if (this.isValidPosition(stringIndex, fretIndex)) {
      this.strings[stringIndex].frets[fretIndex].press();
    } else {
      throw new Error("Invalid string or fret index");
    }
  }

  public release(stringIndex: number, fretIndex: number): void {
    if (this.isValidPosition(stringIndex, fretIndex)) {
      this.strings[stringIndex].frets[fretIndex].release();
    } else {
      throw new Error("Invalid string or fret index");
    }
  }

  public isPressed(stringIndex: number, fretIndex: number): boolean {
    if (this.isValidPosition(stringIndex, fretIndex)) {
      return this.strings[stringIndex].frets[fretIndex].isPressed;
    }
    throw new Error("Invalid string or fret index");
  }

  private isValidPosition(stringIndex: number, fretIndex: number): boolean {
    return (
      stringIndex >= 0 &&
      stringIndex < this.numStrings &&
      fretIndex >= 0 &&
      fretIndex < this.numFrets
    );
  }
}
