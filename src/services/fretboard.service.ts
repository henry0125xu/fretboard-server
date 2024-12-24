import { FullNote, FULL_NOTE_REGEX } from "../models/note";
import { Fret } from "../models/fret";
import { AppError } from "../errors/appError";
import { Fretboard } from "../models/fretboard";
import { setFretMIDINoteNumbers } from "../utils/stringUtils";

export class FretboardService {
  private fretboard: Fretboard;
  constructor() {
    this.fretboard = FretboardService.getDefaultFretboard();
  }

  public async getFretboard(userId: string): Promise<Fretboard> {
    return this.fretboard;
  }

  public async resetFretboard(userId: string): Promise<Fretboard> {
    this.fretboard = FretboardService.getDefaultFretboard();
    return this.fretboard;
  }

  public async updateOpenString(
    userId: string,
    stringId: string,
    openString: string
  ): Promise<Fretboard> {
    const parsedStringId = this.parseStringId(stringId);
    const parsedOpenString = this.parseOpenString(openString);
    const string = this.fretboard.strings[parsedStringId];
    string.openString = parsedOpenString;
    setFretMIDINoteNumbers(string);
    return this.fretboard;
  }

  public async updateNumFrets(
    userId: string,
    numFrets: string
  ): Promise<Fretboard> {
    const parsedNumFrets = this.parseNumFrets(numFrets);
    this.fretboard.strings.forEach((string) => {
      const diff = parsedNumFrets - string.numFrets;
      if (diff === 0) return;

      let opCount = Math.abs(diff);
      if (diff < 0) {
        while (opCount--) string.frets.pop();
      } else {
        while (opCount--) string.frets.push(new Fret());
        setFretMIDINoteNumbers(string);
      }
    });

    return this.fretboard;
  }

  private parseStringId(stringId: string): number {
    const result = Number(stringId);
    if (isNaN(result) || result < 0 || result > this.fretboard.numStrings) {
      throw new AppError("Not Found", 404);
    }
    return result;
  }

  private parseOpenString(openString: string): FullNote {
    const match = openString.match(FULL_NOTE_REGEX);
    if (!match) {
      throw new AppError("Not Found", 404);
    }
    return openString as FullNote;
  }

  private parseNumFrets(numFrets: string): number {
    const result = Number(numFrets);
    if (isNaN(result) || result <= 0) {
      throw new AppError("Not Found", 404);
    }
    return result;
  }

  private static getDefaultFretboard(): Fretboard {
    const fretboard = new Fretboard(["E4", "B3", "G3", "D3", "A2", "E2"], 22);
    fretboard.strings.forEach((string) => setFretMIDINoteNumbers(string));
    return fretboard;
  }
}
