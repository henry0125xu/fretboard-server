import { Fretboard } from "../models/fretboard";
import * as stringUtils from "../utils/stringUtils";
import * as fretboardUtils from "../utils/fretboardUtils";
import { parseNumber, parseFullNote } from "../utils/stringParsers";
import { Store } from "../models/store";

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

  public async updateOpenString(
    userId: string,
    stringId: string,
    openString: string
  ): Promise<Fretboard> {
    const fretboard = await this.getFretboard(userId);
    const parsedStringId = parseNumber(stringId);
    const parsedOpenString = parseFullNote(openString);

    const string = fretboardUtils.getString(fretboard, parsedStringId);
    stringUtils.updateOpenString(string, parsedOpenString);

    await this.store.set(userId, fretboard);
    return fretboard;
  }

  public async updateNumFrets(
    userId: string,
    numFrets: string
  ): Promise<Fretboard> {
    const fretboard = await this.getFretboard(userId);
    const parsedNumFrets = parseNumber(numFrets);
    fretboard.strings.forEach((string) => {
      stringUtils.updateNumFrets(string, parsedNumFrets);
    });

    await this.store.set(userId, fretboard);
    return fretboard;
  }
}
