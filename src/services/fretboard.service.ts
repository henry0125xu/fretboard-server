import { Fretboard } from "../models/fretboard";
import * as stringUtils from "../utils/string.utils";
import * as fretboardUtils from "../utils/fretboard.utils";
import {
  parseNumber,
  parseBasicNote,
  parseFullNote,
} from "../utils/stringParsers";
import { Store } from "../models/store";
import { BasicNote } from "../models/note";

export class FretboardService {
  private readonly store: Store;
  public constructor(store: Store) {
    this.store = store;
  }

  public async getFretboard(userId: string): Promise<Fretboard> {
    let fretboard = await this.store.get(userId);
    if (!fretboard) {
      fretboard = fretboardUtils.initializeFretboard();
      await this.store.set(userId, fretboard);
    }
    return fretboard as Fretboard;
  }

  public async resetFretboard(userId: string): Promise<Fretboard> {
    const fretboard = fretboardUtils.initializeFretboard();
    await this.store.set(userId, fretboard);
    return fretboard;
  }

  public async insertString(
    userId: string,
    stringId: string,
    openString: string
  ): Promise<Fretboard> {
    return await this.updateFromStore(userId, (fretboard) => {
      const parsedStringId = parseNumber(stringId);
      const parsedOpenString = parseFullNote(openString);

      const numFrets = fretboard.strings[0].frets.length;
      const newString = stringUtils.initailizeString(
        parsedOpenString,
        numFrets
      );
      fretboardUtils.insertString(fretboard, newString, parsedStringId);
    });
  }

  public async deleteString(
    userId: string,
    stringId: string
  ): Promise<Fretboard> {
    return await this.updateFromStore(userId, (fretboard) => {
      const parsedStringId = parseNumber(stringId);
      fretboardUtils.deleteString(fretboard, parsedStringId);
    });
  }

  public async updateOpenString(
    userId: string,
    stringId: string,
    openString: string
  ): Promise<Fretboard> {
    return await this.updateFromStore(userId, (fretboard) => {
      const parsedStringId = parseNumber(stringId);
      const parsedOpenString = parseFullNote(openString);

      const string = fretboardUtils.getString(fretboard, parsedStringId);
      stringUtils.updateOpenString(string, parsedOpenString);
    });
  }

  public async updateNumFrets(
    userId: string,
    numFrets: string
  ): Promise<Fretboard> {
    return await this.updateFromStore(userId, (fretboard) => {
      const parsedNumFrets = parseNumber(numFrets);
      fretboard.strings.forEach((string) => {
        stringUtils.updateNumFrets(string, parsedNumFrets);
      });
    });
  }

  public async pressNotes(userId: string, notes: string[]) {
    return await this.updateFromStore(userId, (fretboard) => {
      const parsedBasicNotes: BasicNote[] = notes.map((note) =>
        parseBasicNote(note)
      );
      fretboardUtils.pressBasicNotes(fretboard, parsedBasicNotes);
    });
  }

  private async updateFromStore(
    userId: string,
    callback: (fretboard: Fretboard) => void
  ): Promise<Fretboard> {
    const fretboard = await this.getFretboard(userId);
    callback(fretboard);
    await this.store.set(userId, fretboard);
    return fretboard;
  }
}
