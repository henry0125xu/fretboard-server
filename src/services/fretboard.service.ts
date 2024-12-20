import { FullNote } from "../models/note";
import { AppError } from "../errors/appError";
import { Fretboard } from "../models/fretboard";
import { setFretClassesForString } from "../utils/stringUtils";
import { setFretClassesForFretboard } from "../utils/fretboardUtils";

export class FretboardService {
  private fretboard: Fretboard;
  constructor() {
    this.fretboard = FretboardService.getDefaultFretboard();
  }

  public async getFretboard(): Promise<Fretboard> {
    return this.fretboard;
  }

  public async resetFretboard(): Promise<Fretboard> {
    this.fretboard = FretboardService.getDefaultFretboard();
    return this.fretboard;
  }

  public async updateFretboardString(
    stringId: string,
    openString: string
  ): Promise<Fretboard> {
    const id = Number(stringId);
    if (!openString || id < 0 || id > this.fretboard.numStrings) {
      throw new AppError("Not Found", 404);
    }

    const string = this.fretboard.strings[id];
    string.openString = openString as FullNote;
    setFretClassesForString(string);
    return this.fretboard;
  }

  private static getDefaultFretboard(): Fretboard {
    const fretboard = new Fretboard(["E4", "B3", "G3", "D3", "A2", "E2"], 22);
    setFretClassesForFretboard(fretboard);
    return fretboard;
  }
}
