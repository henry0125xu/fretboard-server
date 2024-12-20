import { FullNote } from "./note";
import { Fret } from "./fret";

export class String {
  public readonly frets: Fret[];
  public openString: FullNote;

  public constructor(openString: FullNote, numFrets: number) {
    if (numFrets <= 0) {
      throw new Error("Number of frets must be larger than 0");
    }

    this.frets = Array.from({ length: numFrets }, (_, _index) => new Fret());
    this.openString = openString;
  }

  public get numFrets(): number {
    return this.frets.length;
  }

  public toJSON() {
    return {
      openString: this.openString,
      numFrets: this.numFrets,
      frets: this.frets,
    };
  }
}
