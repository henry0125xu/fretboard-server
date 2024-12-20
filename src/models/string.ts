import { FullNote } from "./note";
import { Fret } from "./fret";
import { mapToNoteCode } from "../utils/noteUtils";

export class String {
  public readonly numFrets: number;
  public readonly frets: Fret[];
  private _openString: FullNote;
  public get openString(): FullNote {
    return this._openString;
  }
  public constructor(openString: FullNote, numFrets: number) {
    this._openString = openString;
    this.numFrets = numFrets;
    this.frets = Array(numFrets);
    this.initializeFrets();
  }

  public toJSON() {
    return {
      openString: this._openString,
      numFrets: this.numFrets,
      frets: this.frets,
    };
  }

  public updateOpenString(openString: FullNote) {
    this._openString = openString;
    this.initializeFrets();
  }

  private initializeFrets(): void {
    for (let fretIndex = 0; fretIndex < this.numFrets; fretIndex++) {
      const noteCode = mapToNoteCode(this.openString) + fretIndex;
      this.frets[fretIndex] = new Fret(noteCode);
    }
  }
}
