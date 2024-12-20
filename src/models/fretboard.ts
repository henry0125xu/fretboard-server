import { String } from "./string";
import { FullNote } from "./note";

export class Fretboard {
  public readonly strings: String[];

  public constructor(openStrings: FullNote[], numFrets: number) {
    if (!openStrings || openStrings.length == 0) {
      throw new Error("Number of strings must be larger than 0");
    }

    if (numFrets <= 0) {
      throw new Error("Number of frets must be larger than 0");
    }

    this.strings = Array.from(
      { length: openStrings.length },
      (_, stringIndex) => new String(openStrings[stringIndex], numFrets)
    );
  }

  public get openStrings() {
    return Array.from(
      { length: this.strings.length },
      (_, stringIndex) => this.strings[stringIndex].openString
    );
  }

  public get numStrings() {
    return this.strings.length;
  }

  public get numFrets() {
    return this.strings[0].numFrets;
  }

  public toJSON() {
    return {
      openStrings: this.openStrings,
      numStrings: this.numStrings,
      numFrets: this.numFrets,
      strings: this.strings,
    };
  }

  public press(stringIndex: number, fretIndex: number): void {
    if (this.isValidPosition(stringIndex, fretIndex)) {
      this.strings[stringIndex].frets[fretIndex].isPressed = true;
    } else {
      throw new Error("Invalid string or fret index");
    }
  }

  public release(stringIndex: number, fretIndex: number): void {
    if (this.isValidPosition(stringIndex, fretIndex)) {
      this.strings[stringIndex].frets[fretIndex].isPressed = false;
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
