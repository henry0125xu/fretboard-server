import { Fretboard } from "../models/fretboard";
import { User } from "../models/user";
import * as notesUtils from "../utils/note.utils";
import * as stringUtils from "../utils/string.utils";
import * as fretboardUtils from "../utils/fretboard.utils";
import * as pressStrategyUtils from "../utils/pressStrategy.utils";
import {
  parseNumber,
  parseBasicNote,
  parseFullNote,
} from "../utils/stringHelpers";
import { Store } from "../models/store";
import { BasicNote } from "../models/note";
import { PitchClassPressStrategy } from "../models/pressStrategy";

export class FretboardService {
  private readonly store: Store;
  public constructor(store: Store) {
    this.store = store;
  }

  public async getFretboard(userId: string): Promise<Fretboard> {
    return await this.updateFromStore(userId, (_user) => {});
  }

  public async resetFretboard(userId: string): Promise<Fretboard> {
    return await this.updateFromStore(userId, (user) => {
      user.fretboard = fretboardUtils.initializeFretboard();
      user.pressStrategy = pressStrategyUtils.initializePressStrategy("none");
    });
  }

  public async insertString(
    userId: string,
    stringId: string,
    openString: string
  ): Promise<Fretboard> {
    return await this.updateFromStore(userId, (user) => {
      const fretboard = user.fretboard;
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
    return await this.updateFromStore(userId, (user) => {
      const fretboard = user.fretboard;
      const parsedStringId = parseNumber(stringId);
      fretboardUtils.deleteString(fretboard, parsedStringId);
    });
  }

  public async updateOpenString(
    userId: string,
    stringId: string,
    openString: string
  ): Promise<Fretboard> {
    return await this.updateFromStore(userId, (user) => {
      const fretboard = user.fretboard;
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
    return await this.updateFromStore(userId, (user) => {
      const fretboard = user.fretboard;
      const parsedNumFrets = parseNumber(numFrets);
      fretboard.strings.forEach((string) => {
        stringUtils.updateNumFrets(string, parsedNumFrets);
      });
    });
  }

  public async pressNotes(userId: string, notes: string[]) {
    return await this.updateFromStore(userId, (user) => {
      const parsedBasicNotes: BasicNote[] = notes.map((note) =>
        parseBasicNote(note)
      );
      if (!(user.pressStrategy instanceof PitchClassPressStrategy)) {
        user.pressStrategy =
          pressStrategyUtils.initializePressStrategy("pitch-class");
      }
      user.pressStrategy.state =
        notesUtils.getPitchClassBitmap(parsedBasicNotes);
    });
  }

  private async updateFromStore(
    userId: string,
    callback: (user: User) => void
  ): Promise<Fretboard> {
    const user = await this.getUser(userId);
    callback(user);
    pressStrategyUtils.press(user.fretboard, user.pressStrategy);
    await this.store.set<User>(userId, user);
    return user.fretboard;
  }

  private async getUser(userId: string): Promise<User> {
    let user = await this.store.get<User>(userId);
    if (!user) {
      const fretboard = fretboardUtils.initializeFretboard();
      const pressStrategy = pressStrategyUtils.initializePressStrategy("none");
      user = { id: userId, fretboard, pressStrategy };
      await this.store.set<User>(userId, user as User);
    }
    return user as User;
  }
}
