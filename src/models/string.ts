import { FullNote } from "./note";
import { Fret } from "./fret";

export class String {
  public frets: Fret[] = [];
  public openString: FullNote = "C4";
}
