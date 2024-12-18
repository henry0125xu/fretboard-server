import { FullNote } from "./note";
import { Fret } from "./fret";
import { mapToNoteCode } from "../utils/noteUtils";

export class String {
  public readonly openString: FullNote;
  public readonly numFrets: number;
  public readonly frets: Fret[];

  public constructor(openString: FullNote, numFrets: number) {
    this.openString = openString;
    this.numFrets = numFrets;
    this.frets = Array(numFrets);
    this.initializeFrets();
  }

  private initializeFrets(): void {
    for (let fretIndex = 0; fretIndex < this.numFrets; fretIndex++) {
      const noteCode = mapToNoteCode(this.openString) + fretIndex;
      this.frets[fretIndex] = new Fret(noteCode);
    }
  }
}
